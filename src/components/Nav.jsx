import React from 'react'

const Nav = ({ loggedUser }) => {
  return (
    <nav>
      {/* <NavLink to="/" aria-label="Go to home">
        <img src={logomark} alt="" height={30} />
        <span>Clocktower</span>
      </NavLink> */}
      {loggedUser && (
        <Form
          method="post"
          action="/logout"
          onSubmit={(event) => {
            if (!confirm("Delete user and all data?")) {
              event.preventDefault();
            } else {
            }
          }}
        >
          <button type="submit" className="btn btn--warning">
            <span>Reset</span>
            <TrashIcon width={20} />
          </button>
        </Form>
      )}
    </nav>
  )
}

export default Nav
