import React, { useMemo } from 'react';
import ReactTooltip from 'react-tooltip';

const Tooltip = ({ id, ...options }) => {
  id = useMemo(() => {
    return id ? String(id) : Math.ceil(Math.random() * 100000, 6).toString();
  }, [id]);

  return <ReactTooltip className="tiphive-tooltip" {...options} id={id} />;
};

export default Tooltip;
