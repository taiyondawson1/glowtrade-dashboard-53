import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Calendar, Book, Share2, Plus, Activity, LineChart, PenLine, Check } from "lucide-react";
import { format } from 'date-fns';

interface Habit {
  id: string;
  name: string;
  date: string;
  journaling: boolean;
  backtesting: boolean;
  exercise: boolean;
  reading: boolean;
  shared: boolean;
}

const DailyHabits = () => {
  const [activeTab, setActiveTab] = useState('today');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newHabitName, setNewHabitName] = useState('');

  const handleAddHabit = () => {
    if (!isAddingNew) {
      setIsAddingNew(true);
      return;
    }

    if (newHabitName.trim()) {
      const newHabit: Habit = {
        id: Date.now().toString(),
        name: newHabitName,
        date: format(new Date(), 'yyyy-MM-dd'),
        journaling: false,
        backtesting: false,
        exercise: false,
        reading: false,
        shared: false
      };

      setHabits([...habits, newHabit]);
      setNewHabitName('');
      setIsAddingNew(false);
    }
  };

  const toggleHabitStatus = (habitId: string, field: keyof Omit<Habit, 'id' | 'name' | 'date'>) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, [field]: !habit[field] }
        : habit
    ));
  };

  const calculateProgress = (habit: Habit): number => {
    const fields = ['journaling', 'backtesting', 'exercise', 'reading', 'shared'];
    const completed = fields.filter(field => habit[field as keyof Habit]).length;
    return Math.round((completed / fields.length) * 100);
  };

  const renderHabitRow = (habit: Habit) => (
    <TableRow key={habit.id} className="hover:bg-black/20 border-silver/20">
      <TableCell className="text-mediumGray h-5 py-0.5">{habit.name}</TableCell>
      <TableCell className="text-mediumGray h-5 py-0.5">{format(new Date(habit.date), 'MMM dd')}</TableCell>
      <TableCell className="text-mediumGray h-5 py-0.5">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-5 w-5 p-0 ${habit.journaling ? 'text-accent-blue' : 'text-mediumGray'}`}
          onClick={() => toggleHabitStatus(habit.id, 'journaling')}
        >
          {habit.journaling ? <Check className="h-4 w-4" /> : <PenLine className="h-4 w-4" />}
        </Button>
      </TableCell>
      <TableCell className="text-mediumGray h-5 py-0.5">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-5 w-5 p-0 ${habit.backtesting ? 'text-accent-blue' : 'text-mediumGray'}`}
          onClick={() => toggleHabitStatus(habit.id, 'backtesting')}
        >
          {habit.backtesting ? <Check className="h-4 w-4" /> : <LineChart className="h-4 w-4" />}
        </Button>
      </TableCell>
      <TableCell className="text-mediumGray h-5 py-0.5">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-5 w-5 p-0 ${habit.exercise ? 'text-accent-blue' : 'text-mediumGray'}`}
          onClick={() => toggleHabitStatus(habit.id, 'exercise')}
        >
          {habit.exercise ? <Check className="h-4 w-4" /> : <Activity className="h-4 w-4" />}
        </Button>
      </TableCell>
      <TableCell className="text-mediumGray h-5 py-0.5">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-5 w-5 p-0 ${habit.reading ? 'text-accent-blue' : 'text-mediumGray'}`}
          onClick={() => toggleHabitStatus(habit.id, 'reading')}
        >
          {habit.reading ? <Check className="h-4 w-4" /> : <Book className="h-4 w-4" />}
        </Button>
      </TableCell>
      <TableCell className="text-mediumGray h-5 py-0.5">
        <Button 
          variant="ghost" 
          size="icon" 
          className={`h-5 w-5 p-0 ${habit.shared ? 'text-accent-blue' : 'text-mediumGray'}`}
          onClick={() => toggleHabitStatus(habit.id, 'shared')}
        >
          {habit.shared ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
        </Button>
      </TableCell>
      <TableCell className="text-mediumGray h-5 py-0.5">{calculateProgress(habit)}%</TableCell>
    </TableRow>
  );

  return (
    <div className="border border-silver/20 p-6">
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <Button variant="outline" className="bg-accent-blue/10 hover:bg-accent-blue/20 text-softWhite">
            New Day Today
          </Button>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="bg-transparent w-full justify-start border-b border-silver/20">
            <TabsTrigger value="today" className="data-[state=active]:bg-accent-blue/20">Today</TabsTrigger>
            <TabsTrigger value="week" className="data-[state=active]:bg-accent-blue/20">This Week</TabsTrigger>
            <TabsTrigger value="month" className="data-[state=active]:bg-accent-blue/20">This Month</TabsTrigger>
            <TabsTrigger value="calendar" className="data-[state=active]:bg-accent-blue/20">
              <Calendar className="h-4 w-4" />
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-silver/20">
              <TableHead className="text-mediumGray h-5 py-0.5">Name</TableHead>
              <TableHead className="text-mediumGray h-5 py-0.5">Date</TableHead>
              <TableHead className="text-mediumGray h-5 py-0.5">
                <PenLine className="h-4 w-4" />
                <span className="sr-only">Journaling</span>
              </TableHead>
              <TableHead className="text-mediumGray h-5 py-0.5">
                <LineChart className="h-4 w-4" />
                <span className="sr-only">Backtesting</span>
              </TableHead>
              <TableHead className="text-mediumGray h-5 py-0.5">
                <Activity className="h-4 w-4" />
                <span className="sr-only">Exercise</span>
              </TableHead>
              <TableHead className="text-mediumGray h-5 py-0.5">
                <Book className="h-4 w-4" />
                <span className="sr-only">Reading</span>
              </TableHead>
              <TableHead className="text-mediumGray h-5 py-0.5">
                <Share2 className="h-4 w-4" />
                <span className="sr-only">Share in Discord</span>
              </TableHead>
              <TableHead className="text-mediumGray h-5 py-0.5">Progress</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {habits.map(renderHabitRow)}
            <TableRow className="hover:bg-black/20 border-silver/20">
              <TableCell colSpan={8} className="text-mediumGray h-5 py-0.5">
                {isAddingNew ? (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newHabitName}
                      onChange={(e) => setNewHabitName(e.target.value)}
                      className="flex-1 bg-transparent border-none text-softWhite focus:outline-none focus:ring-0"
                      placeholder="Enter habit name..."
                      onKeyDown={(e) => e.key === 'Enter' && handleAddHabit()}
                    />
                    <Button 
                      variant="ghost" 
                      onClick={handleAddHabit}
                      className="px-2 hover:bg-transparent hover:text-accent-blue"
                    >
                      Add
                    </Button>
                  </div>
                ) : (
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start px-0 hover:bg-transparent hover:text-accent-blue"
                    onClick={handleAddHabit}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    New
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DailyHabits;