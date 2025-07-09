"use client";

import { useState } from 'react';
import { db } from '../../lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import withAuth from '../../lib/withAuth';

const TiptapEditor = ({ content, onChange }: { content: string, onChange: (content: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
    ],
    content: content,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: 'prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none',
      },
    },
  });

  return (
    <div className="border rounded-lg">
      <EditorContent editor={editor} />
    </div>
  );
};


function AdminPage() {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [content, setContent] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    if (!title || !category || !content) {
      setError('Por favor, preencha todos os campos obrigatórios.');
      setIsSubmitting(false);
      return;
    }

    try {
      await addDoc(collection(db, 'noticias'), {
        Title: title,
        Category: category,
        ImageURL: imageUrl,
        Content: content,
        Date: serverTimestamp(),
      });
      setSuccess('Notícia publicada com sucesso!');
      // Reset form
      setTitle('');
      setCategory('');
      setImageUrl('');
      setContent('');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unexpected error occurred.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-5xl mx-auto">
        <h1 className="text-4xl font-extrabold mb-8 text-center text-gray-800">Painel de Administração</h1>
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="title" className="block text-gray-700 font-bold mb-2">Título</label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
            <div>
              <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Categoria</label>
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              />
            </div>
          </div>
          <div className="mb-8">
            <label htmlFor="imageUrl" className="block text-gray-700 font-bold mb-2">URL da Imagem de Destaque</label>
            <input
              type="url"
              id="imageUrl"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="shadow-sm appearance-none border rounded-lg w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="mb-12">
            <label className="block text-gray-700 font-bold mb-2">Conteúdo da Notícia</label>
            <TiptapEditor content={content} onChange={setContent} />
          </div>
          
          {error && <p className="text-red-600 bg-red-100 p-3 rounded-lg text-center mb-4">{error}</p>}
          {success && <p className="text-green-600 bg-green-100 p-3 rounded-lg text-center mb-4">{success}</p>}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full focus:outline-none focus:shadow-outline disabled:bg-gray-400 transition-transform transform hover:scale-105"
            >
              {isSubmitting ? 'Publicando...' : 'Publicar Notícia'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default withAuth(AdminPage);
