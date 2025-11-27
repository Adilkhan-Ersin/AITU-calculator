import { supabase } from '@/lib/supabaseClient';
import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/useUser';

export function useFinalGrade(subject: string) {
  const { user } = useUser();
  const [finalGrade, setFinalGrade] = useState('');
  const [savedGrade, setSavedGrade] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadSavedGrade = async () => {
      if (!user) {
        setIsLoading(false);
        return;
      }
      
      const { data, error } = await supabase
        .from('final_grades')
        .select('final_grade')
        .eq('user_id', user.id)
        .eq('subject', subject)
        .eq('semester', 'Fall 2025')
        .single();

      if (!error && data) {
        setSavedGrade(data.final_grade);
      }
      setIsLoading(false);
    };

    loadSavedGrade();
  }, [user, subject]);

  const saveGrade = async (grade: number) => {
    if (!user) throw new Error('User not logged in');

    const { error } = await supabase
      .from('final_grades')
      .upsert({
        user_id: user.id,
        subject,
        final_grade: grade,
        semester: 'Fall 2025'
      }, {
        onConflict: 'user_id,subject,semester'
      });

    if (error) throw error;
    setSavedGrade(grade);
  };

  const handleSave = async () => {
    const gradeValue = parseFloat(finalGrade);
    if (isNaN(gradeValue) || gradeValue < 0 || gradeValue > 100) {
      throw new Error('Please enter a valid grade between 0 and 100');
    }

    setIsSaving(true);
    try {
      await saveGrade(gradeValue);
      setFinalGrade('');
    } finally {
      setIsSaving(false);
    }
  };

  const updateGrade = () => {
    setSavedGrade(null);
    setFinalGrade(savedGrade?.toString() || '');
  };

  return {
    finalGrade,
    setFinalGrade,
    savedGrade,
    isSaving,
    isLoading,
    handleSave,
    updateGrade
  };
}