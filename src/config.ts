const dev = process.env.NODE_ENV === "development";

const backend = dev
  ? "http://localhost:5000"
  : "https://tanaka-collection.herokuapp.com";

export { backend };
