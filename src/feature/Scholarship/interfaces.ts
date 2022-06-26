export interface Image {
  data: {
    id: string;
    attributes: {
      url: string;
    };
  };
}
export interface Section {
  id: string;
  Title: string;
  Content: string;
  Collapsible: boolean;
}

export interface FAQ {
  id: string;
  Question: string;
  Answer: string;
}

export interface Timeline {
  id: string;
  Date: string;
  Description: string;
  Title: string;
}
export interface Organization {
  data: {
    id: string;
    attributes: {
      Name: string;
      Description: string;
      Logo: Image;
    };
  };
}
export interface ScholarshipDetails {
  scholarship: {
    data: {
      attributes: {
        Name: string;
        Description: string;
        Logo: Image;
        Link: string;
        Sections: Section[];
        FAQs: FAQ[];
        Timeline: Timeline[];
        Organization: Organization;
      };
    };
  };
}
