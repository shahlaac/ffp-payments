import { Transform } from 'class-transformer';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export default function TransformDate() {
  const toPlain = Transform(
    value => {
      if (value) {
        return new Date(value).toISOString().slice(0, 10);
      }
      return null;
    },
    {
      toPlainOnly: true,
    },
  );

  const toClass = Transform(value => new Date(value), {
    toClassOnly: true,
  });

  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  return function(target: any, key: string) {
    toPlain(target, key);
    toClass(target, key);
  };
}
