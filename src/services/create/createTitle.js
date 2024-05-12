export const createTitle = (title) => {
  if (title) {
    return (
      <main className="mainContent">
        <h2>{title}</h2>
      </main>
    );
  }
}
