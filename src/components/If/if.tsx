import React, { ReactNode } from 'react';

type RootProps = {
  condition: boolean;
  children: ReactNode | ReactNode[];
};

type RenderProps = {
  children: ReactNode;
};

type ElseProps = {
  children: ReactNode;
};

export type IfProps = {
  Root: React.FC<RootProps>;
  Render: React.FC<RenderProps>;
  Else: React.FC<ElseProps>;
};

const Render: React.FC<RenderProps> = ({ children }) => <>{children}</>;

const Else: React.FC<ElseProps> = ({ children }: ElseProps) => <>{children}</>;

const Root: React.FC<RootProps> = ({ condition, children }) => {
  if (typeof condition !== 'boolean') {
    throw new Error('The condition property of <If.Root> must be a boolean.');
  }

  const childArray = React.Children.toArray(children);

  const hasUnknownComponents = childArray.some(
    (child) =>
      (child as React.ReactElement).type !== Render &&
      (child as React.ReactElement).type !== Else,
  );

  const renderComponents = childArray.filter(
    (child) => (child as React.ReactElement).type === Render,
  );
  const elseComponents = childArray.filter(
    (child) => (child as React.ReactElement).type === Else,
  );

  if (renderComponents.length === 0 || childArray.length === 0) {
    throw new Error('The <If.Root> component must have a <If.Render> child.');
  }

  if (hasUnknownComponents) {
    throw new Error(
      'The <If.Root> component should not have any children different from <If.Render> or <If.Else> tags.',
    );
  }

  if (childArray.length > 2) {
    throw new Error('The <If.Root> component can have at most 2 children.');
  }

  const renderComponent = renderComponents[0];
  const elseComponent = elseComponents[0];

  if (condition) {
    return <>{renderComponent}</>;
  }

  return elseComponent ? <>{elseComponent}</> : <></>;
};

export const If: IfProps = {
  Root,
  Render,
  Else,
};
