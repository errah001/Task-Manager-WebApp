export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
  dueDate?: string;
  folderId?: string;
}

export interface Folder {
  id: string;
  name: string;
  createdAt: string;
}

export type TodoContextType = {
  todos: Todo[];
  folders: Folder[];
  addTodo: (text: string, folderId?: string, dueDate?: string) => void;
  toggleTodo: (id: string) => void;
  deleteTodo: (id: string) => void;
  editTodo: (id: string, text: string, dueDate?: string) => void;
  addFolder: (name: string) => void;
  deleteFolder: (id: string) => void;
};