// eslint-disable-next-line no-unused-vars
import React from 'react';

export default class DDMenu extends React.Component {

    getMenuItemTitle = (menuItem, index, depthLevel) => {
        return menuItem.name;
      };
    
      getMenuItem = (menuItem, index,depthLevel) => {
        let name = this.getMenuItemTitle(menuItem, index, depthLevel);
    
        if (menuItem.level && menuItem.level.length > 0) {
          return (
            <li>
              {name} <span className="caret"></span>
              <DropDownMenu config={menuItem.level} depthLevel={depthLevel} level={true} />
            </li>
          );
        } else {
          return <li>{name}</li>;
        }
      };
    
      render = () => {
        let { config,depthLevel } = this.props;
    
        let options = [];
        config.map((item, index) => {
          options.push(this.getMenuItem(item, index,depthLevel ));
        });
    
        if (this.props.level && this.props.level === true)
          return <ul><center>{options}</center></ul>;
    
        return <ul style={{color: '#ffffff',fontWeight: '500',fontSize: '16px'}} className="dropDown-menu"><center>{options}</center></ul>;
      };
    }