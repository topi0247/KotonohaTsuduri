import * as Mantine from "@mantine/core";

export default function TagsInput({
  label,
  placeholder,
  data,
  props,
}: {
  label: string;
  placeholder: string;
  data: string[];
  props: object;
}) {
  return (
    <>
      <Mantine.InputLabel className="stripe-pattern px-2">{label}</Mantine.InputLabel>
      <Mantine.TagsInput
        name="genres"
        placeholder={placeholder}
        width="100%"
        splitChars={["、", ","]}
        variant="unstyled"
        className="border-b border-dashed border-sky-200"
        {...props}
        data={data}
      />
    </>
  );
}
