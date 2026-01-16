type Props = {
  user?: {
    id: number;
    name: string;
    username: string;
    email: string;
  };
};

export const UserInfo: React.FC<Props> = ({ user }) => {
  if (!user) {
    return null;
  }

  return (
    <a
      className="UserInfo"
      href={`mailto:${user.email}`}
    >
      {user.name}
    </a>
  );
};
