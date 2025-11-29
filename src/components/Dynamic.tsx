import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
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

const GradeCategory = ({
  category,
  onUpdateCategory,
  onRemoveCategory
}: {
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

  // Calculate category score
  const calculateCategoryScore = () => {
    const p = (val: string) => parseFloat(val) || 0;
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

    return totalCategoryWeight > 0 ? (totalWeightedScore / totalCategoryWeight) * 100 : 0;
  };

  const categoryScore = calculateCategoryScore();

  return (
    <div className="bg-card rounded-lg mb-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <Input
          type="text"
          placeholder="Category Name"
          value={category.name}
          onChange={(e) => onUpdateCategory(category.id, {
            ...category,
            name: e.target.value
          })}
          className="w-full text-lg font-bold p-2"
        />
        <div className="flex items-center gap-2">
          <Input
            type="number"
            value={category.totalWeight}
            onChange={(e) => updateCategoryWeight(Number(e.target.value))}
            min="0"
            max="100"
            className="w-20 bg-input text-foreground p-2 border border-foreground"
          />
          <span className="text-foreground w-36 font-bold">% of final grade</span>
        </div>
      </div>

      {/* DESKTOP TABLE */}
      <div className="hidden sm:block overflow-x-auto mb-4">
        <table className="w-full border-spacing-x-2 table-auto border-collapse text-sm">
          <thead>
            <tr className="text-left text-foreground/80">
              <th className="py-2">Item Name</th>
              <th className="py-2">Score (%)</th>
              <th className="py-2">Weight</th>
              <th className="py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {category.items.map(item => (
              <tr key={item.id} className="border-t  border-foreground/10">
                <td className="py-2 ">
                  <Input
                    value={item.name}
                    onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                    placeholder="Item name"
                    className="w-72 p-2 border border-foreground bg-input"
                  />
                </td>
                <td className="py-2">
                  <Input
                    type="number"
                    value={item.score}
                    onChange={(e) => updateItem(item.id, 'score', e.target.value)}
                    placeholder="Score"
                    min="0"
                    max="100"
                    className="w-24 p-2 border border-foreground bg-input"
                  />
                </td>
                <td className="py-2">
                  <Input
                    type="number"
                    value={item.weight}
                    onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
                    placeholder="Weight"
                    min="0"
                    step="0.1"
                    className="w-16 p-2 border border-foreground bg-input"
                  />
                </td>
                <td className="py-2">
                  <Button
                    onClick={() => removeItem(item.id)}
                    variant="destructive"
                    size="sm"
                    type="button"
                    className="px-2 py-1 text-destructive-foreground"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* MOBILE CARDS */}
      <div className="sm:hidden flex flex-col gap-3 mb-4">
        {category.items.map(item => (
          <div
            key={item.id}
            className="border border-foreground/20 p-3 rounded-lg bg-card"
          >
            <div className="flex flex-col gap-2">
              <Input
                value={item.name}
                placeholder="Item name"
                className="w-full p-2 border border-foreground/60 bg-input"
                onChange={(e) => updateItem(item.id, 'name', e.target.value)}
              />
              <Input
                type="number"
                value={item.score}
                placeholder="Score %"
                className="w-full p-2 border border-foreground/60 bg-input"
                onChange={(e) => updateItem(item.id, 'score', e.target.value)}
              />
              <Input
                type="number"
                value={item.weight}
                placeholder="Weight"
                className="w-full p-2 border border-foreground/60 bg-input"
                onChange={(e) => updateItem(item.id, 'weight', e.target.value)}
              />
              <Button
                onClick={() => removeItem(item.id)}
                variant="destructive"
                size="sm"
                type="button"
                className="w-full px-3 py-2 text-destructive-foreground"
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
        <div className="text-sm text-foreground/70">
          Category Score: <span className="font-bold text-primary">{categoryScore.toFixed(2)}%</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <Button
            size='sm'
            onClick={addItem}
            variant='outline'
            type="button"
            className="w-full sm:w-36 text-sm"
          >
            + Add Assignment
          </Button>
          <Button
            size='sm'
            variant='destructive'
            type="button"
            onClick={() => onRemoveCategory(category.id)}
            className="w-full sm:w-36 text-sm"
          >
            Remove Category
          </Button>
        </div>
      </div>
    </div>
  );
};

// GPA conversion functions (similar to GPA.tsx)
const percentToGpa = (p: number) => {
  if (p >= 95) return 4.0;
  if (p >= 90) return 3.67;
  if (p >= 85) return 3.33;
  if (p >= 80) return 3.0;
  if (p >= 75) return 2.67;
  if (p >= 70) return 2.33;
  if (p >= 65) return 2.0;
  if (p >= 60) return 1.67;
  if (p >= 55) return 1.33;
  if (p >= 50) return 1.0;
  if (p >= 25) return 0;
  return 0;
};

const gpaToLetter = (g: number) => {
  if (g >= 4.0) return "A";
  if (g >= 3.67) return "A-";
  if (g >= 3.33) return "B+";
  if (g >= 3.0) return "B";
  if (g >= 2.67) return "B-";
  if (g >= 2.33) return "C+";
  if (g >= 2.0) return "C";
  if (g >= 1.67) return "C-";
  if (g >= 1.33) return "D+";
  if (g >= 1.0) return "D";
  if (g > 0) return "FX";
  return "F";
};

const letterColor = (letter: string) => {
  switch (letter) {
    case "A":
    case "A-":
      return "text-green-500 font-bold";
    case "B+":
    case "B":
    case "B-":
      return "text-lime-700 font-bold";
    case "C+":
    case "C":
    case "C-":
      return "text-yellow-500 font-bold";
    case "D+":
    case "D":
      return "text-orange-500 font-bold";
    case "FX":
    case "F":
      return "text-red-500 font-bold";
    default:
      return "";
  }
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
  const [categoryScores, setCategoryScores] = useState<{ [key: string]: number }>({});
  const [finalGrade, setFinalGrade] = useState(0);

  // --- CALCULATION LOGIC ---
  useEffect(() => {
    const p = (val: string) => parseFloat(val) || 0;

    // Calculate score for each category
    const newCategoryScores: { [key: string]: number } = {};

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

  const finalGpa = percentToGpa(finalGrade);

  return (
    <div className="px-4 pt-4 md:px-8 md:pt-8 max-w-4xl mx-auto w-full">
      <div className="bg-card rounded-lg p-4 md:p-6 border border-foreground">
        <div className='sm:flex items-center justify-between'>
          <h3 className="text-xl font-bold text-foreground mb-4">
            Dynamic Grade Calculator
          </h3>

          {/* BUTTONS */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-4">
            <Button
              onClick={addCategory}
              variant="default"
              size="sm"
              type="button"
              className="px-4 py-2 bg-primary text-secondary font-medium w-full sm:w-auto"
            >
              + Add Category
            </Button>
          </div>
        </div>

        {/* CATEGORIES */}
        <div className="space-y-4">
          {categories.map(category => (
            <GradeCategory
              key={category.id}
              category={category}
              onUpdateCategory={updateCategory}
              onRemoveCategory={removeCategory}
            />
          ))}
        </div>

        {/* STATS - Matching GPA layout */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3">
          <div className="p-3 rounded-md border bg-card">
            <div className="text-sm text-foreground">Final Grade</div>
            <div className="text-2xl font-bold text-primary">
              {finalGrade.toFixed(1)}%
            </div>
          </div>

          <div className="p-3 rounded-md border bg-card">
            <div className="text-sm text-foreground">Final GPA</div>
            <div className="text-2xl font-bold text-primary">
              {finalGpa.toFixed(2)}{" "}
              <span className={letterColor(gpaToLetter(finalGpa))}>
                {gpaToLetter(finalGpa)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-md border bg-card">
            <div className="text-sm text-foreground">Total Weight</div>
            <div className="text-2xl font-bold">
              {totalWeightPercentage}%
              {totalWeightPercentage !== 100 && (
                <span className="text-sm text-red-500 block">
                  (Should be 100%)
                </span>
              )}
            </div>
          </div>

          {/* Category Scores */}
          {categories.map(category => (
            <div key={category.id} className="p-3 rounded-md border bg-card">
              <p className="text-sm text-foreground">{category.name}</p>
              <p className="text-xl font-semibold text-accent-foreground">
                {categoryScores[category.id]?.toFixed(2) || '0.00'}%
              </p>
              <p className="text-xs text-foreground/70">{category.totalWeight}% weight</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}