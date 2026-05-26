

export default function SearchBar() {
  return (
    <section className="text-center">
      <h1 className="font-extrabold text-4xl">How's the sky looking today?</h1>
      <form
        className="py-8 flex flex-col  justify-center gap-4 sm:flex-row"
        action=""
      >
        <input
          className="px-2 sm:min-w-lg p-2 rounded-lg bg-Neutral_600"
          type="text"
          name=""
          id=""
        />
        <button className="rounded-lg py-2 px-3 bg-Blue_700" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}
