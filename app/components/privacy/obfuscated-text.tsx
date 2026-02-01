"use client";

import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";

interface ObfuscatedTextProps {
    value: string | number;
    isPrivate?: boolean;
    className?: string;
}

export function ObfuscatedText({ value, isPrivate = false, className = "" }: ObfuscatedTextProps) {
    const [revealed, setRevealed] = useState(false);

    if (!isPrivate) {
        return <span className={className}>{value}</span>;
    }

    return (
        <span className={`inline-flex items-center gap-2 group cursor-pointer ${className}`} onClick={() => setRevealed(!revealed)}>
            <span className={revealed ? "" : "blur-sm select-none"}>
                {revealed ? value : "••••••"}
            </span>
            {revealed ? (
                <EyeOff className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            ) : (
                <Eye className="w-3 h-3 text-gray-400 opacity-0 group-hover:opacity-100 transition-opacity" />
            )}
        </span>
    );
}
