import React, { Component } from "react";
import { Navbar, NavbarBrand, NavLink, NavItem, Nav } from "reactstrap";

class Header extends Component {
  render() {
    // const user = this.props.user;
    // const name = user.displayName;
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand style={{ fontSize: "1.5em" }} href="/">
            To-do List beta
          </NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="/about/">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink
                target="_blank"
                href="https://github.com/thisisamank/TodoList"
              >
                Github
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

export default Header;
