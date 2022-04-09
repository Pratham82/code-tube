import Chip from "components/chip";

export default function ChipsContainer({ categories }: any) {
  return (
    <div className="flex justify-center flex-wrap chip-container">
      {categories.map(({ _id, categoryName }: any) => (
        <Chip key={_id} category={categoryName} />
      ))}
    </div>
  );
}
