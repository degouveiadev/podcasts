import slugify from 'slugify';

export default (name: string): string => {
  return slugify(name, { lower: true }).replace(/[^\w\-]+/g, '');
};
