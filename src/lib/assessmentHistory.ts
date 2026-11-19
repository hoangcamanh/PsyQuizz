// Assessment History Local Storage Model & Utilities (Privacy-First)

export interface StoredDimensionScore {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  levelLabel?: string;
  levelColor?: string;
}

export interface AssessmentHistoryRecord {
  id: string;
  assessmentId: string;
  code: string;
  assessmentName: string;
  title: string;
  summary: string;
  timestamp: string;
  riskTier?: 'green' | 'yellow' | 'red';
  scores: Record<string, StoredDimensionScore>;
  dassMetrics?: {
    depression: number;
    anxiety: number;
    stress: number;
  };
}

const STORAGE_KEY = 'psyquizz_assessment_history';

export function getAssessmentHistory(): AssessmentHistoryRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime());
  } catch (err) {
    console.error('Failed to load assessment history:', err);
    return [];
  }
}

export function saveAssessmentToHistory(
  record: Omit<AssessmentHistoryRecord, 'id' | 'timestamp'>
): AssessmentHistoryRecord {
  const newRecord: AssessmentHistoryRecord = {
    ...record,
    id: `hist_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    timestamp: new Date().toISOString()
  };

  if (typeof window !== 'undefined') {
    try {
      const current = getAssessmentHistory();
      // Avoid duplicate spam within 30 seconds for same test & score
      const isDuplicate = current.some(
        (item) =>
          item.assessmentId === record.assessmentId &&
          item.title === record.title &&
          Date.now() - new Date(item.timestamp).getTime() < 30000
      );
      if (!isDuplicate) {
        const updated = [newRecord, ...current].slice(0, 50); // Keep up to 50 entries
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        // Dispatch custom event for reactive UI updates
        window.dispatchEvent(new CustomEvent('psyquizz_history_updated'));
      }
    } catch (err) {
      console.error('Failed to save assessment history:', err);
    }
  }

  return newRecord;
}

export function deleteAssessmentFromHistory(id: string): void {
  if (typeof window === 'undefined') return;
  try {
    const current = getAssessmentHistory();
    const updated = current.filter((item) => item.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    window.dispatchEvent(new CustomEvent('psyquizz_history_updated'));
  } catch (err) {
    console.error('Failed to delete history item:', err);
  }
}

export function clearAllAssessmentHistory(): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    window.dispatchEvent(new CustomEvent('psyquizz_history_updated'));
  } catch (err) {
    console.error('Failed to clear history:', err);
  }
}
