interface Project extends Projects {
  board: number;
  pages: Pages[];
}

type Pages = {
  id: number;
  title: string;
  project: number;
  lists: Lists[];
};

type Lists = {
  id: number;
  title: string;
  page: number;
  tasks: Tasks[];
};

type Tasks = {
  created: Date;
  id: number;
  title: string;
  list: number;
  state: string;
};
