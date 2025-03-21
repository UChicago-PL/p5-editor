import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { withTranslation } from 'react-i18next';

import Button from '../../../common/Button';
import Nav from '../../../components/Nav';
import Overlay from '../../App/components/Overlay';
import CollectionList from '../../IDE/components/CollectionList';
import SketchList from '../../IDE/components/SketchList';
import SubmissionList from '../../IDE/components/SubmissionList';
import { CollectionSearchbar, SketchSearchbar } from '../../IDE/components/Searchbar';

import CollectionCreate from '../components/CollectionCreate';
import DashboardTabSwitcherPublic, { TabKey } from '../components/DashboardTabSwitcher';

class DashboardView extends React.Component {
  constructor(props) {
    super(props);
    this.closeAccountPage = this.closeAccountPage.bind(this);
    this.gotoHomePage = this.gotoHomePage.bind(this);
  }

  componentDidMount() {
    document.body.className = this.props.theme;
  }

  closeAccountPage() {
    browserHistory.push(this.props.previousPath);
  }

  gotoHomePage() {
    browserHistory.push('/');
  }

  selectedTabKey() {
    const path = this.props.location.pathname;

    if (/assets/.test(path)) {
      return TabKey.assets;
    } else if (/collections/.test(path)) {
      return TabKey.collections;
    } else if (/submissions/.test(path)) {
      return TabKey.submissions;
    }

    return TabKey.sketches;
  }

  ownerName() {
    if (this.props.params.username) {
      return this.props.params.username;
    }

    return this.props.user.username;
  }

  isOwner() {
    return this.props.user.username === this.props.params.username;
  }

  isCollectionCreate() {
    const path = this.props.location.pathname;
    return /collections\/create$/.test(path);
  }

  returnToDashboard = () => {
    const owner = this.ownerName();
    browserHistory.push(`/${owner}/collections`);
  };

  renderActionButton(tabKey, username, t) {
    switch (tabKey) {
      case TabKey.collections:
        return (
          this.isOwner() && (
            <>
              <Button to={`/${username}/collections/create`}>{t('DashboardView.CreateCollection')}</Button>
              <CollectionSearchbar />
            </>
          )
        );
      case TabKey.submissions:
        return (
          this.isOwner() && (
            <>
              <div>Submission List</div>
              <div>A list of the most current version of your submissions</div>
            </>
          )
        );
      case TabKey.sketches:
      default:
        return (
          <>
            {this.isOwner() && <Button to="/">{t('DashboardView.NewSketch')}</Button>}
            <SketchSearchbar />
          </>
        );
    }
  }

  renderContent(tabKey, username) {
    switch (tabKey) {
      case TabKey.submissions:
        return <SubmissionList />;
      case TabKey.collections:
        return <CollectionList key={username} username={username} />;
      case TabKey.sketches:
      default:
        return <SketchList key={username} username={username} />;
    }
  }

  render() {
    const currentTab = this.selectedTabKey();
    const isOwner = this.isOwner();
    const { username } = this.props.params;
    const actions = this.renderActionButton(currentTab, username, this.props.t);
    if (!isOwner) {
      return <div>BROWSING OTHERS WORK IS NOT ALLOWED</div>;
    }
    return (
      <div className="dashboard">
        <Nav layout="dashboard" />

        <main className="dashboard-header">
          <div className="dashboard-header__header">
            <h2 className="dashboard-header__header__title">{this.ownerName()}</h2>
            <div className="dashboard-header__nav">
              <DashboardTabSwitcherPublic currentTab={currentTab} isOwner={isOwner} username={username} />
              {actions && <div className="dashboard-header__actions">{actions}</div>}
            </div>
          </div>

          <div className="dashboard-content">{this.renderContent(currentTab, username)}</div>
        </main>
        {this.isCollectionCreate() && (
          <Overlay
            title={this.props.t('DashboardView.CreateCollectionOverlay')}
            closeOverlay={this.returnToDashboard}
          >
            <CollectionCreate />
          </Overlay>
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    previousPath: state.ide.previousPath,
    user: state.user,
    theme: state.preferences.theme
  };
}

DashboardView.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  params: PropTypes.shape({
    username: PropTypes.string.isRequired
  }).isRequired,
  previousPath: PropTypes.string.isRequired,
  theme: PropTypes.string.isRequired,
  user: PropTypes.shape({
    username: PropTypes.string
  }),
  t: PropTypes.func.isRequired
};
DashboardView.defaultProps = { user: null };

export default withTranslation()(connect(mapStateToProps)(DashboardView));
