export const Title = ({ title }) => {
  if (title) {
    return (
      <main className="mainContent">
        <h2>{title}</h2>
      </main>
    );
  }
};
