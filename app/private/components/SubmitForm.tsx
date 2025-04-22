'use client';

import { useState } from 'react';
import { createClient } from '@/utils/supabase/client';

interface SubmitFormProps {
    modules: {
        id: number;
        name: string;
        trainings: { id: number; name: string }[];
    }[];
    userId: string;
}

export default function SubmitForm({ modules, userId }: SubmitFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [file, setFile] = useState<File | null>(null);
    const [selectedTrainings, setSelectedTrainings] = useState<{ id: number; name: string }[]>([]);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] || null;
        setFile(selectedFile);
    };

    const handleModuleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const moduleId = Number(event.target.value);
        const module = modules.find((mod) => mod.id === moduleId);
        setSelectedTrainings(module?.trainings || []);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const trainingId = Number(formData.get('trainingId'));

        if (!file) {
            setError('Please upload a file before submitting.');
            return;
        }

        try {
            setIsSubmitting(true);

            // Téléversez le fichier dans Supabase Storage
            const supabase = createClient();
            const { data: storageData, error: storageError } = await supabase.storage
                .from('submissions')
                .upload(`user-${userId}/${Date.now()}-${file.name}`, file);

            if (storageError) {
                throw new Error(storageError.message || 'Failed to upload file');
            }

            const fileUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/submissions/${storageData.path}`;

            // Insérez les métadonnées dans la table `submission`
            const { data, error } = await supabase
                .from('submission')
                .insert({
                    module_id: Number(formData.get('moduleId')),
                    training_id: trainingId,
                    user_id: userId,
                    file_url: fileUrl,
                    review_status: 'pending',
                });

            if (error) {
                throw new Error(error.message || 'Failed to submit work');
            }

            alert('Work submitted successfully!');
        } catch (err: any) {
            console.error('Error submitting work:', err);
            setError(err.message || 'An error occurred.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="flex justify-center items-center px-6 py-4">
            <div className="w-full max-w-md bg-stone-700 p-8 rounded-2xl space-y-4 border border-stone-500">
                {error && <p className="text-red-400 text-sm text-center">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-10">
                    <div className="flex flex-col">
                        <label htmlFor="moduleId" className="mb-1 text-sm">
                            Select Module
                        </label>
                        <select
                            id="moduleId"
                            name="moduleId"
                            onChange={handleModuleChange}
                            className="px-4 py-2 text-sm rounded bg-stone-600 text-stone-100 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500"
                            required
                        >
                            <option value="">Select a module</option>
                            {modules.map((module) => (
                                <option key={module.id} value={module.id}>
                                    {module.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {selectedTrainings.length > 0 && (
                        <div className="flex flex-col">
                            <label htmlFor="trainingId" className="mb-1 text-sm">
                                Select Training
                            </label>
                            <select
                                id="trainingId"
                                name="trainingId"
                                className="px-4 py-2 text-sm rounded bg-stone-600 text-stone-100 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500"
                                required
                            >
                                <option value="">Select a training</option>
                                {selectedTrainings.map((training) => (
                                    <option key={training.id} value={training.id}>
                                        {training.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="flex flex-col">
                        <label htmlFor="file" className="mb-1 text-sm">
                            Upload File
                        </label>
                        <input
                            id="file"
                            name="file"
                            type="file"
                            onChange={handleFileChange}
                            className="px-4 py-2 text-sm rounded bg-stone-600 text-stone-100 border border-stone-500 focus:outline-none focus:ring-2 focus:ring-stone-500"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full py-2 rounded bg-stone-600 hover:bg-stone-500 transition-colors disabled:opacity-50"
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit Work'}
                    </button>
                </form>
            </div>
        </div>
    );
}