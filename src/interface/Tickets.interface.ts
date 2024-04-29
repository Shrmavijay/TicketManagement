export interface tickets {
    user_id: number;
    user_name?: string
    title: string;
    description: string;
    priority:string;
    status:string;
    due_date:Date|string;
  }
  