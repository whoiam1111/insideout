// components/LoadingSpinner.tsx
interface LoadingSpinnerProps {
    text?: string; // optional로 추가
}

export default function LoadingSpinner({ text }: LoadingSpinnerProps) {
    return (
        <div className="flex flex-col items-center gap-2">
            <div className="w-12 h-12 border-4 border-t-indigo-600 border-gray-200 rounded-full animate-spin"></div>
            {text && <p className="text-gray-600">{text}</p>}
        </div>
    );
}
