export default function Loader({ text = "Loading..." }) {
  return (
    <div className="loaderWrap">
      <div className="loader"></div>
      <p>{text}</p>
    </div>
  );
}
