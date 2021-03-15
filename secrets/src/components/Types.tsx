export interface Secret {
  id: string;
  name: string;
  text: string;
}

export const dummySecret: Secret = {
  id: "id_dummy",
  name: "name_dummy",
  text: "text_dummy",
};
