import React from 'react';
import collapseIcon from '@/assets/common/buttons/collapse-button.svg';
import expandIcon from '@/assets/common/buttons/expand-button.svg';

type Props = {
  expanded: boolean;
  onToggle: () => void;
};

const ExpandCollapseButton: React.FC<Props> = ({ expanded, onToggle }) => (
  <button type="button" onClick={onToggle}>
    <img
      src={expanded ? collapseIcon : expandIcon}
      alt={expanded ? 'collapse' : 'expand'}
      className="w-33 h-33"
    />
  </button>
);

export default ExpandCollapseButton;
