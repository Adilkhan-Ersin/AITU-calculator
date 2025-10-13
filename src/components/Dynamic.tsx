import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { X } from 'lucide-react';
// --- TYPE DEFINITIONS ---
interface GradeItem {
  id: string;
  name: string;
  score: string; // percentage (0-100)
  weight: string; // weight of this item within its category
}

interface Category {
  id: string;
  name: string;
  items: GradeItem[];
  totalWeight: number; // total weight of this category in final grade (e.g., 30 for 30%)
}

// --- REUSABLE COMPONENTS ---

// A dynamic input field for each grade item
const GradeItemInput = ({ item, onUpdate, onRemove } : { 
  item: GradeItem; 
  onUpdate: (id: string, field: string, value: string) => void; 
  onRemove: (id: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row items-center gap-4 mb-3">
    <input
      type="text"
      value={item.name}
      onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
      placeholder="Item Name (e.g., Quiz 1)"
      className="w-full flex-grow bg-input text-foreground p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
    />
    <div className='flex w-full gap-2'>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={item.score}
          onChange={(e) => onUpdate(item.id, 'score', e.target.value)}
          placeholder="Score %"
          min="0"
          max="100"
          className="w-20 sm:w-24 bg-input text-accent-foreground p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <span className="text-foreground font-bold">%</span>
      </div>
      <div className="flex items-center gap-2">
        <input
          type="number"
          value={item.weight}
          onChange={(e) => onUpdate(item.id, 'weight', e.target.value)}
          placeholder="Weight"
          min="0"
          step="0.1"
          className="w-20 sm:w-24 bg-input text-accent-foreground p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <span className="text-foreground font-bold">points</span>
      </div>
    </div>
    <Button
      size={'icon'}
      onClick={() => onRemove(item.id)}
      className="w-full sm:w-10 flex items-center bg-card-foreground justify-center"
      aria-label="Remove Item"
    ><X className='text-card' />
    </Button>
  </div>
);

// A reusable section for each category (Mid Term, End Term, etc.)
const GradeCategory = ({ 
  category, 
  onUpdateCategory, 
  onRemoveCategory 
} : { 
  category: Category; 
  onUpdateCategory: (id: string, updatedCategory: Category) => void;
  onRemoveCategory: (id: string) => void;
}) => {
  const addItem = () => {
    const newItem: GradeItem = {
      id: crypto.randomUUID(),
      name: `Assignment ${category.items.length + 1}`,
      score: '',
      weight: '',
    };
    onUpdateCategory(category.id, {
      ...category,
      items: [...category.items, newItem]
    });
  };

  const updateItem = (id: string, field: string, value: string) => {
    onUpdateCategory(category.id, {
      ...category,
      items: category.items.map(it => 
        it.id === id ? { ...it, [field]: value } : it
      )
    });
  };

  const removeItem = (id: string) => {
    onUpdateCategory(category.id, {
      ...category,
      items: category.items.filter(it => it.id !== id)
    });
  };

  const updateCategoryWeight = (weight: number) => {
    onUpdateCategory(category.id, {
      ...category,
      totalWeight: weight
    });
  };

  return (
    <div className="bg-card p-5 rounded-lg border border-foreground">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
        <input
          type="text"
          value={category.name}
          onChange={(e) => onUpdateCategory(category.id, {
            ...category,
            name: e.target.value
          })}
          className="text-lg sm:text-2xl font-bold bg-transparent border-b border-foreground focus:outline-none"
        />
        <div className="flex w-full items-center gap-2">
          <input
            type="number"
            value={category.totalWeight}
            onChange={(e) => updateCategoryWeight(Number(e.target.value))}
            min="0"
            max="100"
            className="w-20 bg-input text-accent-foreground p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <span className="text-foreground font-bold">% of final grade</span>
        </div>
      </div>
      
      <div className="space-y-3">
        {category.items.map(item => (
          <GradeItemInput
            key={item.id}
            item={item}
            onUpdate={updateItem}
            onRemove={removeItem}
          />
        ))}
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-center mt-4">
        <Button
          size={'sm'}
          onClick={addItem}
          className="text-accent-foreground bg-accent hover:bg-accent-foreground hover:text-accent w-full sm:w-36 text-sm font-semibold"
        >
          + Add Assignment
        </Button>
        <Button
          size={'sm'}
          onClick={() => onRemoveCategory(category.id)}
          className="mt-2 sm:mt-0 text-primary-foreground px-3 py-1 rounded-md w-full sm:w-36 text-sm"
        >
          Remove Category
        </Button>
      </div>
    </div>
  );
};

// --- MAIN DYNAMIC CALCULATOR COMPONENT ---
export default function DynamicGradeCalculator() {
  // --- STATE FOR CATEGORIES ---
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Mid Term',
      items: [
        { id: '1-1', name: 'Assignment', score: '', weight: '4' },
        { id: '1-2', name: 'Assignment2', score: '', weight: '4' },
        { id: '1-4', name: 'Mid Term Exam', score: '', weight: '8' }
      ],
      totalWeight: 30
    },
    {
      id: '2',
      name: 'End Term',
      items: [
        { id: '2-1', name: 'Assignment', score: '', weight: '4' },
        { id: '2-2', name: 'Assignment2', score: '', weight: '4' },
        { id: '2-4', name: 'End Term Exam', score: '', weight: '8' }
      ],
      totalWeight: 30
    },
    {
      id: '3',
      name: 'Final Exam',
      items: [
        { id: '3-1', name: 'Final Exam Quiz', score: '', weight: '40' }
      ],
      totalWeight: 40
    }
  ]);

  // --- STATE FOR CALCULATED RESULTS ---
  const [categoryScores, setCategoryScores] = useState<{[key: string]: number}>({});
  const [finalGrade, setFinalGrade] = useState(0);

  // --- CALCULATION LOGIC ---
  useEffect(() => {
    const p = (val: string) => parseFloat(val) || 0;

    // Calculate score for each category
    const newCategoryScores: {[key: string]: number} = {};

    categories.forEach(category => {
      let totalWeightedScore = 0;
      let totalCategoryWeight = 0;

      category.items.forEach(item => {
        const score = p(item.score);
        const weight = p(item.weight);
        if (weight > 0) {
          totalWeightedScore += (score / 100) * weight;
          totalCategoryWeight += weight;
        }
      });

      // Calculate category score as percentage
      const categoryScore = totalCategoryWeight > 0 ? 
        (totalWeightedScore / totalCategoryWeight) * 100 : 0;
      
      newCategoryScores[category.id] = categoryScore;
    });

    setCategoryScores(newCategoryScores);

    // Calculate final grade
    let totalFinalGrade = 0;
    categories.forEach(category => {
      const categoryScore = newCategoryScores[category.id] || 0;
      totalFinalGrade += categoryScore * (category.totalWeight / 100);
    });

    setFinalGrade(totalFinalGrade);

  }, [categories]);

  const addCategory = () => {
    const newCategory: Category = {
      id: crypto.randomUUID(),
      name: `New Category ${categories.length + 1}`,
      items: [{ 
        id: crypto.randomUUID(), 
        name: 'Assignment 1', 
        score: '', 
        weight: '100' 
      }],
      totalWeight: 0
    };
    setCategories([...categories, newCategory]);
  };

  const updateCategory = (id: string, updatedCategory: Category) => {
    setCategories(categories.map(cat => 
      cat.id === id ? updatedCategory : cat
    ));
  };

  const removeCategory = (id: string) => {
    if (categories.length > 1) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  // Calculate total weight percentage
  const totalWeightPercentage = categories.reduce(
    (sum, category) => sum + category.totalWeight, 0
  );

  return (
    <div className='px-4 pt-4 sm:px-8 sm:pt-8'>
      {/* --- RESULTS DISPLAY --- */}
      <div className="bg-card rounded-xl p-6 mb-8 shadow-lg border border-foreground">
        <h2 className="text-lg font-medium text-foreground text-center">
          Your Calculated Final Grade
        </h2>
        <p className="text-6xl font-bold text-center text-primary mt-2">
          {finalGrade.toFixed(2)}%
        </p>
        
        {/* Weight Summary */}
        <div className="mt-4 text-center">
          <p className="text-foreground">
            Total Weight: {totalWeightPercentage}%
            {totalWeightPercentage !== 100 && (
              <span className="text-primary ml-2">
                (Should be 100% - currently {totalWeightPercentage > 100 ? 'over' : 'under'})
              </span>
            )}
          </p>
        </div>

        <div className="mt-6 grid grid-cols-3 lg:grid-cols-3 gap-2 sm:gap-4 text-center">
          {categories.map(category => (
            <div key={category.id}>
              <p className="text-foreground text-sm sm:text-base">{category.name}</p>
              <p className="text-lg md:text-2xl font-semibold text-accent-foreground">
                {categoryScores[category.id]?.toFixed(2) || '0.00'}%
              </p>
              <p className="text-sm text-muted-foreground">{category.totalWeight}% of final</p>
            </div>
          ))}
        </div>
      </div>

      {/* --- CATEGORY MANAGEMENT --- */}
      <div className="mb-6 flex justify-between items-center">
        <h2 className="title-text2 text-2xl font-bold text-foreground">Course Categories</h2>
        <Button
          onClick={addCategory}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-md transition-colors"
        >
          + Add Category
        </Button>
      </div>

      {/* --- GRADE INPUTS --- */}
      <div className="grid grid-cols-1 gap-8">
        {categories.map(category => (
          <GradeCategory
            key={category.id}
            category={category}
            onUpdateCategory={updateCategory}
            onRemoveCategory={removeCategory}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="mt-8 p-4 bg-card rounded-lg border border-foreground">
        <h3 className="font-bold text-foreground text-sm sm:text-base mb-2">How to use:</h3>
        <ul className="list-disc list-inside text-sm sm:text-base text-foreground space-y-1">
          <li>Add/remove categories for different parts of your course (Mid Term, Quizzes, Projects, etc.)</li>
          <li>Set the category weight as percentage of final grade</li>
          <li>Add assignments within each category with their individual weights</li>
          <li>Enter your scores as percentages (0-100%)</li>
          <li>Ensure total category weights sum to 100% for accurate calculation</li>
        </ul>
      </div>
    </div>
  );
}