import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sparkles } from "lucide-react";

export default function LunchMenuApp() {
  const [lunches, setLunches] = useState([]);
  const [newLunch, setNewLunch] = useState("");

  const log = (message) => console.log(message);

  const addLunchToEnd = () => {
    if (!newLunch) return;
    setLunches((prev) => {
      const updated = [...prev, newLunch];
      log(`${newLunch} added to the end of the lunch menu.`);
      return updated;
    });
    setNewLunch("");
  };

  const addLunchToStart = () => {
    if (!newLunch) return;
    setLunches((prev) => {
      const updated = [newLunch, ...prev];
      log(`${newLunch} added to the start of the lunch menu.`);
      return updated;
    });
    setNewLunch("");
  };

  const removeLastLunch = () => {
    setLunches((prev) => {
      if (prev.length === 0) {
        log("No lunches to remove.");
        return prev;
      }
      const removed = prev[prev.length - 1];
      log(`${removed} removed from the end of the lunch menu.`);
      return prev.slice(0, -1);
    });
  };

  const removeFirstLunch = () => {
    setLunches((prev) => {
      if (prev.length === 0) {
        log("No lunches to remove.");
        return prev;
      }
      const removed = prev[0];
      log(`${removed} removed from the start of the lunch menu.`);
      return prev.slice(1);
    });
  };

  const getRandomLunch = () => {
    if (lunches.length === 0) {
      log("No lunches available.");
    } else {
      const random = lunches[Math.floor(Math.random() * lunches.length)];
      log(`Randomly selected lunch: ${random}`);
    }
  };

  const showLunchMenu = () => {
    if (lunches.length === 0) {
      log("The menu is empty.");
    } else {
      log(`Menu items: ${lunches.join(", ")}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-blue-100 p-10 flex flex-col items-center">
      <Card className="w-full max-w-2xl shadow-xl rounded-2xl">
        <CardContent className="p-8 space-y-6">
          <h1 className="text-3xl font-bold text-center flex items-center justify-center gap-2">
            <Sparkles className="text-yellow-400" /> Amazing Lunch Menu App
          </h1>
          <div className="flex gap-4">
            <Input
              value={newLunch}
              onChange={(e) => setNewLunch(e.target.value)}
              placeholder="Enter a lunch item"
              className="flex-1"
            />
            <Button onClick={addLunchToEnd}>Add to End</Button>
            <Button onClick={addLunchToStart} variant="secondary">
              Add to Start
            </Button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <Button onClick={removeLastLunch} variant="destructive">
              Remove Last
            </Button>
            <Button onClick={removeFirstLunch} variant="destructive">
              Remove First
            </Button>
            <Button onClick={getRandomLunch}>Random Lunch</Button>
            <Button onClick={showLunchMenu} variant="outline">
              Show Menu in Console
            </Button>
          </div>
          <div className="mt-6">
            <h2 className="text-xl font-semibold">Current Menu</h2>
            {lunches.length === 0 ? (
              <p className="text-gray-500 italic">The menu is empty.</p>
            ) : (
              <ul className="list-disc list-inside space-y-1">
                {lunches.map((item, index) => (
                  <li key={index} className="text-lg">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}