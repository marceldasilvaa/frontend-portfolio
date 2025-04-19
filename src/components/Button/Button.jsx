import "./Button.css";

const Button = ({
  children,
  className,
  onClick = () => {},
  type = "button",
}) => {
  return (
    <button className={`btn ${className}`} onClick={onClick} type={type}>
      {children}
    </button>
  );
};

export default Button;
