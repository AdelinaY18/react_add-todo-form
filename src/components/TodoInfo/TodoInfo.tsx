import { UserInfo } from '../UserInfo';

type Props = {
  todo: Todo;
};

export const TodoInfo: React.FC<Props> = ({ todo }) => {
  const articleClass = `TodoInfo ${
    todo.completed ? 'TodoInfo--completed' : ''
  }`;

  return (
    <article
      className={articleClass}
      data-id={todo.id}
    >
      <h2 className="TodoInfo__title">
        {todo.title}
      </h2>

      <UserInfo user={todo.user} />
    </article>
  );
};
