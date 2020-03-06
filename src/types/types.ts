export interface Todo {
  id: string;
  description: string;
  completed: boolean;
  order: number;
}

export interface Todos {
  [key: string]: Todo;
}

export interface ThrottleOptions {
  leading?: boolean;
  trailing?: boolean;
}

export interface Ref {
  current: any;
}

export interface Filters {
  [key: string]: {
    text: string;
  };
}
