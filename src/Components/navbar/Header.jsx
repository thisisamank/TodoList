import React, { Component } from "react";
import { Navbar, NavbarBrand, NavLink, NavItem, Nav } from "reactstrap";

class Header extends Component {
  render() {
    return (
      <div>
        <Navbar color="light" light expand="md">
          <NavbarBrand style={{ fontSize: "1.5em" }} href="/">
            Todo-List
          </NavbarBrand>
          <Nav className="ml-auto">
            <NavItem>
              <NavLink href="/about/">About</NavLink>
            </NavItem>
            <NavItem>
              <NavLink style={linkStyles} href="/about/">
                Github
              </NavLink>
            </NavItem>
          </Nav>
        </Navbar>
      </div>
    );
  }
}

const linkStyles = {
  color: "black"
};
export default Header;
