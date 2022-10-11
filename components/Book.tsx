import { DetailedHTMLProps, ButtonHTMLAttributes } from "react";

type ButtonProps = DetailedHTMLProps<
  ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;
interface Props extends ButtonProps {
  title: string;
  author: string;
  excerpt: string;
}

export function Book({ title, author, excerpt, ...props }: Props) {
  return (
    <div>
      <h2>{title}</h2>
      <span>{author}</span>
      <p>{excerpt}</p>
      <button {...props}>Buy this book</button>
    </div>
  );
}
