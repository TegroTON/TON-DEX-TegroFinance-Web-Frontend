import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

function Hints(props: any) {
  return (
    <>
      <OverlayTrigger
        key={props.show}
        placement={props.show}
        delay={props.delay}
        overlay={
          <Tooltip id={`tooltip-${props.show}`}>
            <div className="text-start fs-12 p-1 p-md-2">
            {props.text}
            </div>
          </Tooltip>
        }
      >
        <span>
          {props.content}
        </span>
      </OverlayTrigger>
    </>
  );
}

export default Hints;