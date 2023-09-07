interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  className?: string;
}

export const Button = (props: ButtonProps) => {
  return (
    <button
      className="bg-pinkTheme hover:bg-red-700 py-2 px-8 rounded"
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
};
