import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, X } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ImageUploadProps {
    currentImage?: string;
    onImageChange: (imageUrl: string) => void;
    userInitials: string;
    size?: "sm" | "md" | "lg";
}

const ImageUpload = ({ currentImage, onImageChange, userInitials, size = "md" }: ImageUploadProps) => {
    const [isUploading, setIsUploading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const sizeClasses = {
        sm: "w-16 h-16",
        md: "w-24 h-24",
        lg: "w-32 h-32"
    };

    const handleFileSelect = (file: File) => {
        if (!file.type.startsWith('image/')) {
            alert('Please select an image file');
            return;
        }

        if (file.size > 5 * 1024 * 1024) { // 5MB limit
            alert('File size must be less than 5MB');
            return;
        }

        setIsUploading(true);

        // Convert file to base64 for localStorage storage
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            onImageChange(imageUrl);
            setIsUploading(false);
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setDragOver(false);

        const file = e.dataTransfer.files[0];
        if (file) {
            handleFileSelect(file);
        }
    };

    const handleRemoveImage = () => {
        onImageChange('');
    };

    return (
        <div className="flex flex-col items-center space-y-4">
            <div className="relative group">
                <Avatar className={`${sizeClasses[size]} border-2 border-primary/20`}>
                    <AvatarImage src={currentImage} alt="Profile" />
                    <AvatarFallback className="text-lg font-semibold bg-primary/10 text-primary">
                        {userInitials}
                    </AvatarFallback>
                </Avatar>

                {/* Overlay for upload */}
                <div
                    className={`absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer ${dragOver ? 'opacity-100' : ''
                        }`}
                    onClick={handleButtonClick}
                    onDragOver={handleDragOver}
                    onDragLeave={handleDragLeave}
                    onDrop={handleDrop}
                >
                    {isUploading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                    ) : (
                        <Camera className="w-6 h-6 text-white" />
                    )}
                </div>
            </div>

            <div className="flex flex-col items-center space-y-2">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={handleButtonClick}
                    disabled={isUploading}
                    className="text-xs"
                >
                    <Upload className="w-3 h-3 mr-1" />
                    {isUploading ? 'Uploading...' : 'Upload Photo'}
                </Button>

                {currentImage && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleRemoveImage}
                        className="text-xs text-red-600 hover:text-red-700"
                    >
                        <X className="w-3 h-3 mr-1" />
                        Remove
                    </Button>
                )}

                <p className="text-xs text-muted-foreground text-center">
                    Drag and drop or click to upload<br />
                    Max 5MB • JPG, PNG, GIF
                </p>
            </div>

            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;