"use client";

import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Lock, Unlock } from "lucide-react";

interface PrivacyToggleProps {
    enabled: boolean;
    onToggle: (enabled: boolean) => void;
}

export function PrivacyToggle({ enabled, onToggle }: PrivacyToggleProps) {
    return (
        <div className="flex items-center space-x-2 p-3 bg-zinc-100 dark:bg-zinc-800/50 rounded-lg border border-zinc-200 dark:border-zinc-800">
            <Switch
                id="privacy-mode"
                checked={enabled}
                onCheckedChange={onToggle}
                className="data-[state=checked]:bg-green-500"
            />
            <Label htmlFor="privacy-mode" className="flex items-center space-x-2 cursor-pointer select-none">
                {enabled ? (
                    <>
                        <Lock className="w-4 h-4 text-green-600 dark:text-green-400" />
                        <span className="font-medium">Privacy Mode</span>
                    </>
                ) : (
                    <>
                        <Unlock className="w-4 h-4 text-gray-500" />
                        <span className="text-gray-500">Public Mode</span>
                    </>
                )}
            </Label>
        </div>
    );
}
