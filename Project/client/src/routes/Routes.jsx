import React from 'react'
import { Route, Routes ,Navigate} from 'react-router-dom'
import SLUGS from '../resources/slugs'


import { 
ForgotPasswordPage,
AdminPage,
 CalendarPage,
 ConfidentalPage,
 DashboardPage,
 GamePage,
 GraphsPage,
 LivePage,
 MasterListPage,
 MealsPage,
 ObjectivesPage,
 PlannerPage,
 RecurringPage,
 RoutinesPage,
 SavedItemsPage,
 SettingsPage,
 StatsPage,
 TemplatesPage,
 TodayPage,
 WikiPage,
 WorkspacePage,
Page404,
AccessDeniedPage, 
 HomePage,
 LoginPage,
 SignUpPage,
FirstPage
} from '../pages/index'


import Layout from '../layouts/index';
import { useUser } from '../context/UserProvider';



const AdminPageElement = AdminPage


const CalendarPageElement = CalendarPage
const ConfidentalPageElement = ConfidentalPage
const DashboardPageElement = DashboardPage
const GamePageElement = GamePage
const GraphsPageElement = GraphsPage
const LivePageElement = LivePage
const MasterListPageElement = MasterListPage
const MealsPageElement = MealsPage
const ObjectivesPageElement = ObjectivesPage
const PlannerPageElement =PlannerPage
const RecurringPageElement = RecurringPage
const RoutinesPageElement = RoutinesPage
const SavedItemsPageElement = SavedItemsPage
const SettingsPageElement = SettingsPage
const StatsPageElement = StatsPage
const TodayPageElement = TodayPage
const WikiPageElement = WikiPage
const WorkspacePageElement = WorkspacePage
const TemplatesPageElement = TemplatesPage
const ForgotPasswordPageElement = ForgotPasswordPage

const LayoutElement = Layout

const LoginPageElement = LoginPage
const SignUpPageElement = SignUpPage

const Page404Element = Page404
const HomePageElement = HomePage
const FirstPageElement = FirstPage
const AccessDeniedElement = AccessDeniedPage

// NOT HOCS BECUASE THIS IS FUNCTIONAL NOT CLASS
const AppRoutes = () => {
  const {user}=  useUser()

  return (
    <Routes>
          {/* {(user !== null && user !== undefined && user !== false)?( */}
          {(true)?(
          <Route path='/'  element={<LayoutElement/>}>
                
                <Route  path={SLUGS.home.slug} element={ <HomePageElement/>} />
                <Route  path={SLUGS.wiki.slug + '/*'} element={ <WikiPageElement/>} />
                        
                <Route  path={SLUGS.masterlist.slug} element={ <MasterListPageElement/>} />
                <Route  path={SLUGS.graphs.slug} element={ <GraphsPageElement/>} />
                <Route  path={SLUGS.objectives.slug} element={ <ObjectivesPageElement/>} />
                <Route  path={SLUGS.routines.slug} element={ <RoutinesPageElement/>} />
                <Route  path={SLUGS.calendar.slug} element={ <CalendarPageElement/>} />



                <Route  path={SLUGS.live.slug} element={ <LivePageElement/>} />
                <Route  path={SLUGS.admin.slug} element={<AdminPageElement/>}/>
                <Route  path={SLUGS.confidential.slug} element={ <ConfidentalPageElement/>} />
                <Route  path={SLUGS.dashboard.slug} element={ <DashboardPageElement/>} />
                <Route  path={SLUGS.game.slug} element={ <GamePageElement/>} />
                <Route  path={SLUGS.meals.slug} element={ <MealsPageElement/>} />
                <Route  path={SLUGS.planner.slug} element={ <PlannerPageElement/>} />
                <Route  path={SLUGS.reccuring.slug} element={ <RecurringPageElement/>} />
                <Route  path={SLUGS.saveditems.slug} element={ <SavedItemsPageElement/>} />
                <Route  path={SLUGS.settings.slug} element={ <SettingsPageElement/>} />
                <Route  path={SLUGS.stats.slug} element={<StatsPageElement/>} />
                <Route  path={SLUGS.templates.slug} element={ <TemplatesPageElement/>} />
                <Route  path={SLUGS.today.slug} element={ <TodayPageElement/>} />



                <Route  path={SLUGS.workspace.slug} element={ <WorkspacePageElement/>} />
          </Route>
          ):null}
                <Route path="/hello" element={ <FirstPageElement/> }/>
                <Route path={SLUGS.forgot_pasword.slug} element={ <ForgotPasswordPageElement/>} />
                <Route path={SLUGS.login.slug} element={ <LoginPageElement/>} />
                <Route path={SLUGS.signup.slug} element={ <SignUpPageElement/> }/>
                <Route path={"/404"} element={ <Page404Element/> }/>

                <Route path="*"element={<Navigate to={user ? '/home' : '/login'}/> }/>

                <Route path={SLUGS.access_denied.slug} element={ <AccessDeniedElement/> }/>

    </Routes>
  )
}

export default AppRoutes


