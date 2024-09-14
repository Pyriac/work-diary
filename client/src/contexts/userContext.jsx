import { createContext, useMemo, useState } from "react";
import PropTypes from "prop-types";

export const UserContext = createContext(null);

export default function UserProvider({ children }) {
  const [CurrentUser, setCurrentUser] = useState(null);

  const user = useMemo(() => ({ CurrentUser, setCurrentUser }), [CurrentUser]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
