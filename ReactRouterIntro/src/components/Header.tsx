import { NavLink } from "react-router-dom";

const Header = () => {
  return (
    <header>
      {/* If we use a tag the browser window will refresh when we will click on the link */}
      {/* Therefore we need to use some kind of superpower which will route us to the location  */}
      {/* without refreshing the window tab */}
      {/* <Link to="/">Home</Link> */}
      {/* <Link to="/posts">Posts</Link> */}
      {/* To display the active tag we can use NavLink */}
      {/* NavLink have some built in features like it provides us the active class by default but if */}
      {/* we don't want to use the active class then we can pass a callback inside className */}
      <NavLink
        to="/"
        // one way to add style
        className={({ isActive, isPending, isTransitioning }) =>
          [
            isPending ? "pending" : "",
            isActive ? "activeLink" : "",
            isTransitioning ? "transitioning" : "",
          ].join(" ")
        }
        // another way to add style
        style={({ isActive, isPending, isTransitioning }) => {
          return {
            fontWeight: isActive ? "bold" : "",
            color: isPending ? "red" : "",
            viewTransitionName: isTransitioning ? "slide" : "",
          };
        }}
      >
        Home
      </NavLink>
      <NavLink to="/posts">Posts</NavLink>
    </header>
  );
};

export default Header;
