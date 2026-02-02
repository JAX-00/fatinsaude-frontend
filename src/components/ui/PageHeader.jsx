export default function PageHeader({ title, description }) {
  return (
    <div className="mb-6">
      <h3 className="
        text-2xl font-bold text-center
        mt-6 mb-3 relative
        after:block after:w-80 after:h-1
        after:bg-[#087BA7]
        after:mx-auto after:mt-2
      ">
        {title}
      </h3>

      {description && (
        <p className="text-center">
          {description}
        </p>
      )}
    </div>
  );
}
