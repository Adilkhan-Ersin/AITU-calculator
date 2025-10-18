import { useState, useEffect } from 'react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { X, House, Banana, Bus, Hospital, CreditCard, UtensilsCrossed, Gamepad2, ShoppingBag, Palette, Plane, Goal, User} from 'lucide-react';
import { Button } from '@/components/ui/button';
// --- BUDGET TYPE DEFINITIONS ---
interface IncomeSource {
  id: string;
  name: string;
  amount: string;
  type: 'grant' | 'personal';
}

interface BudgetRule {
  name: string;
  needs: number;
  wants: number;
  savings: number;
  colors: {
    needs: string;
    wants: string;
    savings: string;
  };
}

// --- BUDGET COMPONENTS ---

const IncomeSourceInput = ({ 
  source, 
  onUpdate, 
  onRemove 
} : { 
  source: IncomeSource; 
  onUpdate: (id: string, field: string, value: string) => void; 
  onRemove: (id: string) => void;
}) => (
  <div className="flex flex-col sm:flex-row items-center gap-2 mb-3">
    <input
      type="text"
      value={source.name}
      onChange={(e) => onUpdate(source.id, 'name', e.target.value)}
      placeholder="Income source (e.g., Grant, Job)"
      className="w-full flex-grow bg-input text-foreground p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
    />
    <div className="flex w-full items-center gap-2">
      <input
        type="number"
        value={source.amount}
        onChange={(e) => onUpdate(source.id, 'amount', e.target.value)}
        placeholder="Amount"
        min="0"
        step="0.01"
        className="w-full bg-input text-accent-foreground p-2 rounded-md border border-foreground focus:outline-none focus:ring-1 focus:ring-ring"
      />
      <span className="text-foreground font-bold">₸</span>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="w-32 bg-accent text-foreground p-2 rounded-md ">
            {source.type === 'grant' ? 'Grant' : 'Personal'}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem 
            onClick={() => onUpdate(source.id, 'type', 'grant')}
            className="cursor-pointer"
          >
            Grant
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => onUpdate(source.id, 'type', 'personal')}
            className="cursor-pointer"
          >
            Personal
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>

    <Button
      size={'icon'}
      onClick={() => onRemove(source.id)}
      className="w-full sm:w-10 flex items-center bg-card-foreground justify-center"
      aria-label="Remove Income Source"
    ><X className="text-card" />
    </Button>
  </div>
);

const BudgetRuleDisplay = ({ 
  rule, 
  totalIncome 
} : { 
  rule: BudgetRule; 
  totalIncome: number;
}) => {
  const needsAmount = (totalIncome * rule.needs) / 100;
  const wantsAmount = (totalIncome * rule.wants) / 100;
  const savingsAmount = (totalIncome * rule.savings) / 100;

  return (
    <div className="bg-card p-4 rounded-lg tetx-foreground border border-foreground shadow-sm">
      <h3 className="text-xl font-bold mb-4 text-center">{rule.name} Rule</h3>
      
      {/* Budget Breakdown */}
      <div className="space-y-3 mb-4">
        <div className="flex justify-between items-center">
          <span className="font-semibold">Needs ({rule.needs}%)</span>
          <span className="font-bold">{needsAmount.toFixed(2)}₸</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Wants ({rule.wants}%)</span>
          <span className="font-bold">{wantsAmount.toFixed(2)}₸</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="font-semibold">Savings ({rule.savings}%)</span>
          <span className="font-bold">{savingsAmount.toFixed(2)}₸</span>
        </div>
      </div>

      {/* Visual Budget Bar */}
      <div className="w-full h-6 rounded-full overflow-hidden flex">
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${rule.needs}%`,
            backgroundColor: `var(${rule.colors.needs})`
          }}
          title={`Needs: ${rule.needs}%`}
        />
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${rule.wants}%`,
            backgroundColor: `var(${rule.colors.wants})`
          }}
          title={`Wants: ${rule.wants}%`}
        />
        <div 
          className="h-full transition-all duration-300"
          style={{ 
            width: `${rule.savings}%`,
            backgroundColor: `var(${rule.colors.savings})`
          }}
          title={`Savings: ${rule.savings}%`}
        />
      </div>

      {/* Legend */}
      <div className="flex justify-center gap-4 mt-3 text-xs">
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: `var(${rule.colors.needs})`}}
          />
          <span>Needs</span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: `var(${rule.colors.wants})`}}
          />
          <span>Wants</span>
        </div>
        <div className="flex items-center gap-1">
          <div 
            className="w-3 h-3 rounded"
            style={{ backgroundColor: `var(${rule.colors.savings})`}}
          />
          <span>Savings</span>
        </div>
      </div>
    </div>
  );
};

// --- BUDGET SECTION COMPONENT ---
export default function BudgetPlanner() {
  const [incomeSources, setIncomeSources] = useState<IncomeSource[]>([
    {
      id: '1',
      name: 'Monthly Grant',
      amount: '',
      type: 'grant'
    }
  ]);

  const [totalIncome, setTotalIncome] = useState(0);

  // Budget rules configuration
  const budgetRules: BudgetRule[] = [
    {
      name: '50/30/20',
      needs: 50,
      wants: 30,
      savings: 20,
      colors: {
        needs: '--chart-1', // red
        wants: '--chart-2', // amber
        savings: '--chart-3' // emerald
      }
    },
    {
      name: '60/20/20',
      needs: 60,
      wants: 20,
      savings: 20,
      colors: {
        needs: '--chart-1', // red
        wants: '--chart-2', // amber
        savings: '--chart-3' // emerald
      }
    },
    {
      name: '70/20/10',
      needs: 70,
      wants: 20,
      savings: 10,
      colors: {
        needs: '--chart-1', // red
        wants: '--chart-2', // amber
        savings: '--chart-3' // emerald
      }
    }
  ];

  // Calculate total income
  useEffect(() => {
    const total = incomeSources.reduce((sum, source) => {
      return sum + (parseFloat(source.amount) || 0);
    }, 0);
    setTotalIncome(total);
  }, [incomeSources]);

  const addIncomeSource = () => {
    const newSource: IncomeSource = {
      id: crypto.randomUUID(),
      name: `Income Source ${incomeSources.length + 1}`,
      amount: '',
      type: 'personal'
    };
    setIncomeSources([...incomeSources, newSource]);
  };

  const updateIncomeSource = (id: string, field: string, value: string) => {
    setIncomeSources(incomeSources.map(source => 
      source.id === id ? { ...source, [field]: value } : source
    ));
  };

  const removeIncomeSource = (id: string) => {
    if (incomeSources.length > 1) {
      setIncomeSources(incomeSources.filter(source => source.id !== id));
    }
  };

  return (
    <div className="px-4 pt-4 sm:px-8 sm:pt-8">
      {/* --- BUDGET HEADER --- */}
      <div className="bg-card rounded-xl p-6 mb-8 shadow-lg border border-foreground">
        <h2 className="text-2xl font-medium text-center text-foreground mb-2">
          Student Budget Planner
        </h2>
        <p className="text-xl text-center text-foreground mb-4">
          Total Monthly Income: <span className="text-2xl font-bold text-primary">{totalIncome.toFixed(2)}₸</span>
        </p>
        
        {/* Income Sources Breakdown */}
        <div className="mt-4">
          <h3 className="font-semibold text-foreground mb-2">Income Breakdown:</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {incomeSources.map(source => {
              const amount = parseFloat(source.amount) || 0;
              return amount > 0 ? (
                <div key={source.id} className="flex flex-col justify-between text-sm">
                  <span>{source.name} ({source.type})</span>
                  <span className="font-semibold text-accent-foreground">{amount.toFixed(2)}₸</span>
                </div>
              ) : null;
            })}
          </div>
        </div>
      </div>

      {/* --- INCOME INPUT SECTION --- */}
      <div className="bg-card p-6 rounded-lg border border-foreground mb-8">
        <h3 className="text-2xl font-bold mb-4 text-center">Income Sources</h3>
        <p className="text-center text-foreground mb-4">
          Add all your monthly income sources (grants, job, savings, etc.)
        </p>
        
        <div className="space-y-3">
          {incomeSources.map(source => (
            <IncomeSourceInput
              key={source.id}
              source={source}
              onUpdate={updateIncomeSource}
              onRemove={removeIncomeSource}
            />
          ))}
        </div>
        
        <Button
          onClick={addIncomeSource}
          className="text-accent-foreground bg-accent hover:bg-accent-foreground hover:text-accent w-full sm:w-44 text-sm font-semibold"
        >
          + Add Income Source
        </Button>
      </div>

      {/* --- BUDGET RULES DISPLAY --- */}
      <div className="mb-8">
        <h3 className="text-2xl font-bold text-center mb-6">Recommended Budget Plans</h3>
        <div className="grid grid-cols-1 gap-6">
          {budgetRules.map(rule => (
            <BudgetRuleDisplay
              key={rule.name}
              rule={rule}
              totalIncome={totalIncome}
            />
          ))}
        </div>
      </div>

      {/* --- BUDGET GUIDELINES --- */}
      <div className="bg-card rounded-lg p-4 border border-foreground">
        <h3 className="text-xl font-bold text-foreground mb-3">Budget Categories Guide</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <h4 className="font-semibold text-chart-1 mb-2">Needs (50-70%)</h4>
            <ul className="text-foreground text-sm space-y-1">
              <li className='flex items-center gap-2 hover:text-chart-1'><House className='w-5 h-5'/>Rent & Utilities</li>
              <li className='flex items-center gap-2 hover:text-chart-1'><Banana className='w-5 h-5'/>Groceries</li>
              <li className='flex items-center gap-2 hover:text-chart-1'><Bus className='w-5 h-5'/>Transportation</li>
              <li className='flex items-center gap-2 hover:text-chart-1'><Hospital className='w-5 h-5'/>Healthcare</li>
              <li className='flex items-center gap-2 hover:text-chart-1'><CreditCard className='w-5 h-5'/>Minimum debt payments</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-chart-2 mb-2">Wants (20-30%)</h4>
            <ul className="text-foreground text-sm space-y-1">
              <li className='flex items-center gap-2 hover:text-chart-2'><UtensilsCrossed className='w-5 h-5'/>Dining out</li>
              <li className='flex items-center gap-2 hover:text-chart-2'><Gamepad2 className='w-5 h-5'/>Entertainment</li>
              <li className='flex items-center gap-2 hover:text-chart-2'><ShoppingBag className='w-5 h-5'/>Shopping</li>
              <li className='flex items-center gap-2 hover:text-chart-2'><Palette className='w-5 h-5'/>Hobbies</li>
              <li className='flex items-center gap-2 hover:text-chart-2'><Plane className='w-5 h-5'/>Travel</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-chart-3 mb-2">Savings (10-20%)</h4>
            <ul className="text-foreground text-sm space-y-1">
              <li className='flex items-center gap-2 hover:text-chart-3'><Hospital className='w-5 h-5'/>Emergency fund</li>
              <li className='flex items-center gap-2 hover:text-chart-3'><CreditCard className='w-5 h-5'/>Investments</li>
              <li className='flex items-center gap-2 hover:text-chart-3'><CreditCard className='w-5 h-5'/>Debt repayment</li>
              <li className='flex items-center gap-2 hover:text-chart-3'><Goal className='w-5 h-5'/>Future goals</li>
              <li className='flex items-center gap-2 hover:text-chart-3'><User className='w-5 h-5'/>Retirement</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}