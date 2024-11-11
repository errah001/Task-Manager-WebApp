import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo, Folder, TodoContextType } from '../types';

const TodoContext = createContext<TodoContextType | undefined>(undefined);

export function TodoProvider({ children }: { children: React.ReactNode }) {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const [folders, setFolders] = useState<Folder[]>(() => {
    const savedFolders = localStorage.getItem('folders');
    return savedFolders ? JSON.parse(savedFolders) : [];
  });

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  const addTodo = (text: string, folderId?: string, dueDate?: string) => {
    setTodos([
      ...todos,
      {
        id: crypto.randomUUID(),
        text,
        completed: false,
        createdAt: new Date().toISOString(),
        dueDate,
        folderId,
      },
    ]);
  };

  const toggleTodo = (id: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const editTodo = (id: string, text: string, dueDate?: string) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, dueDate } : todo
      )
    );
  };

  const addFolder = (name: string) => {
    setFolders([
      ...folders,
      {
        id: crypto.randomUUID(),
        name,
        createdAt: new Date().toISOString(),
      },
    ]);
  };

  const deleteFolder = (id: string) => {
    setFolders(folders.filter((folder) => folder.id !== id));
    setTodos(todos.filter((todo) => todo.folderId !== id));
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        folders,
        addTodo,
        toggleTodo,
        deleteTodo,
        editTodo,
        addFolder,
        deleteFolder,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}

export function useTodo() {
  const context = useContext(TodoContext);
  if (context === undefined) {
    throw new Error('useTodo must be used within a TodoProvider');
  }
  return context;
}