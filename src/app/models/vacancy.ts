interface Section {
  type: string;
  title: string;
  describe: string;
}

export interface Vacancy {
  id: number;
  title: string;
  type: string;
  region: string;
  city: string;
  employmentType: string;
  description: string;
  sections: Section[];
}