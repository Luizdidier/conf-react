import React, { Children, isValidElement, cloneElement } from 'react';

/**
 * Clones children and injects the props passed in.
 *
 * @param children
 * @param props
 * @returns {Array}
 */

const cloneChildrenAndInjectProps = (children, props) =>
  Children.map(children, (child) => {
    if (isValidElement(child)) {
      return cloneElement(child, props);
    }
    return child;
  });

export default cloneChildrenAndInjectProps;
