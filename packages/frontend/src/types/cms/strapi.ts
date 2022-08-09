export type StrapiId = { id: number };

export type StrapiComponent<T> = StrapiId & T;

export type StrapiEntity<T> = StrapiId & {
  attributes: T;
};
export type StrapiMultipleData<T> = {
  data: StrapiEntity<T>[] | null;
};
export type StrapiSingleData<T> = {
  data: StrapiEntity<T> | null;
};
