import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ShareDialogComponent } from '../share-dialog/share-dialog.component';

/**
 * Defines an exercise with a name and video URL.
 */
export interface Exercise {
  name: string;
  url: string;
}

/**
 * Defines the interface for the volume landmark objects.
 */
export interface VolumeLandmark {
  "Muscle": string;
  'MV': string;
  'MEV': string;
  'MAV': string;
  'MRV': string;
  "Freq": string;
  "url": string;
  "exercises": Exercise[];
}

/**
 * List of objects representing the muscle group specific
 * definitions for the RP volume landmarks.
 */
const VOLUME_LANDMARKS: VolumeLandmark[] = [
  {
    "Muscle": "Back",
    'MV': "8",
    'MEV': "10",
    'MAV': "14-22",
    'MRV': "25",
    "Freq": "2-4 x Week",
    "url": "https://rpstrength.com/blogs/articles/back-hypertrophy-training-tips",
    "exercises": [
      { name: "Weighted Pull-Up", url: "https://www.youtube.com/watch?v=6FZHJGzMFEc" },
      { name: "Barbell Row", url: "https://www.youtube.com/watch?v=jiowkUMomlw" },
      { name: "Dumbbell Row", url: "https://www.youtube.com/watch?v=UPGuwx7GQ9s" },
      { name: "Chest Supported Row", url: "https://www.youtube.com/watch?v=H260SUUyJBM" },
      { name: "Seated Cable Row", url: "https://www.youtube.com/watch?v=3QcJggd_L24" },
      { name: "Lat Pulldown", url: "https://www.youtube.com/watch?v=0UBRfiO4zDs" },
      { name: "T-Bar Row", url: "https://www.youtube.com/watch?v=_FrrYQxA6kc" },
      { name: "Meadows Row", url: "https://www.youtube.com/watch?v=yPis7nlbqdY" },
      { name: "Rack Pull", url: "https://www.youtube.com/watch?v=tZUYS7X50so" },
      { name: "Straight Arm Pulldown", url: "https://www.youtube.com/watch?v=5PoEksoJNaw" }
    ]
  },
  {
    "Muscle": "Quads",
    'MV': "6",
    'MEV': "8",
    'MAV': "12-18",
    'MRV': "20",
    "Freq": "2-3 x Week",
    "url": "https://rpstrength.com/blogs/articles/quad-hypertrophy-training-tips",
    "exercises": [
      { name: "High Bar Squat", url: "https://www.youtube.com/watch?v=-eO_VydErV0" },
      { name: "Front Squat", url: "https://www.youtube.com/watch?v=0DQvn2qsOG4" },
      { name: "Hack Squat", url: "https://www.youtube.com/watch?v=HHxNbhP16UE" },
      { name: "Leg Press", url: "https://www.youtube.com/watch?v=rYgNArpwE7E" },
      { name: "Walking Lunge", url: "https://www.youtube.com/watch?v=i7J5h7BJ07g" },
      { name: "Belt Squat", url: "https://www.youtube.com/watch?v=m0FOpMEgero" },
      { name: "Leg Extension", url: "https://www.youtube.com/watch?v=yZmx_Ac3880" },
      { name: "Smith Machine Squat", url: "https://www.youtube.com/watch?v=1IIPcUCKxcE" },
      { name: "Bulgarian Split Squat", url: "https://www.youtube.com/watch?v=L__-j2v_LPM" }
    ]
  },
  {
    "Muscle": "Hamstrings",
    'MV': "4",
    'MEV': "6",
    'MAV': "10-16",
    'MRV': "20",
    "Freq": "2-3 x Week",
    "url": "https://rpstrength.com/blogs/articles/hamstring-hypertrophy-training-tips",
    "exercises": [
      { name: "Romanian Deadlift", url: "https://www.youtube.com/watch?v=5_ejbGfdAQE" },
      { name: "Lying Leg Curl", url: "https://www.youtube.com/watch?v=cYKYGwcg0U8" },
      { name: "Seated Leg Curl", url: "https://www.youtube.com/watch?v=SBGYSfoqyfU" },
      { name: "Stiff Leg Deadlift", url: "https://www.youtube.com/watch?v=dEJ0FTm-CEk" },
      { name: "Glute Ham Raise", url: "https://www.youtube.com/watch?v=mnxn-7SO9Ks" },
      { name: "Good Morning", url: "https://www.youtube.com/watch?v=n5WDXD_mpVY" },
      { name: "Single Leg Curl", url: "https://www.youtube.com/watch?v=Orxowest56U" },
      { name: "Sumo Deadlift", url: "https://www.youtube.com/watch?v=N6FVnaasdq0" },
      { name: "Nordic Ham Curl", url: "https://www.youtube.com/watch?v=CN_7cz3P-1U" }
    ]
  },
  {
    "Muscle": "Glutes",
    'MV': "0",
    'MEV': "0",
    'MAV': "4-12",
    'MRV': "16",
    "Freq": "2-3 x Week",
    "url": "https://rpstrength.com/blogs/articles/glute-hypertrophy-training-tips",
    "exercises": [
      { name: "Hip Thrust", url: "https://www.youtube.com/watch?v=EF7jXP17DPE" },
      { name: "Sumo Deadlift", url: "https://www.youtube.com/watch?v=_meXEWq5MOQ" },
      { name: "Cable Pull Through", url: "https://www.youtube.com/watch?v=pv8e6OSyETE" },
      { name: "Walking Lunge", url: "https://www.youtube.com/watch?v=AweC3UaM14o" },
      { name: "Step Up", url: "https://www.youtube.com/watch?v=kvWcDHH62j0" },
      { name: "Glute Kickback", url: "https://www.youtube.com/watch?v=X-uKkAukJVA" },
      { name: "Back Extension", url: "https://www.youtube.com/watch?v=eFWCn5iEbTU" },
      { name: "Barbell Hip Thrust", url: "https://www.youtube.com/watch?v=NLDBFtSNhqg" },
      { name: "Single Leg Hip Thrust", url: "https://www.youtube.com/watch?v=ZSPmIyX9RZs" },
      { name: "Glute Bridge", url: "https://www.youtube.com/watch?v=TQfhY5oJ_Sc" }
    ]
  },
  {
    "Muscle": "Chest",
    'MV': "4",
    'MEV': "6",
    'MAV': "12-20",
    'MRV': "22",
    "Freq": "2-3 x Week",
    "url": "https://rpstrength.com/blogs/articles/chest-hypertrophy-training-tips",
    "exercises": [
      { name: "Flat Barbell Bench Press", url: "https://www.youtube.com/watch?v=4mfLHnFL0Uw" },
      { name: "Incline Barbell Bench Press", url: "https://www.youtube.com/watch?v=Cj6P91eFXkM" },
      { name: "Dumbbell Bench Press", url: "https://www.youtube.com/watch?v=e_8HLu59-to" },
      { name: "Incline Dumbbell Press", url: "https://www.youtube.com/watch?v=_9VlfuYYC7w" },
      { name: "Cable Fly", url: "https://www.youtube.com/watch?v=gmNlqsE3Onc" },
      { name: "Pec Deck", url: "https://www.youtube.com/watch?v=YQ2s_Y7g5Qk" },
      { name: "Dumbbell Fly", url: "https://www.youtube.com/watch?v=JFm8KbhjibM" },
      { name: "Decline Bench Press", url: "https://www.youtube.com/watch?v=BhlL-esnitU" },
      { name: "Machine Chest Press", url: "https://www.youtube.com/watch?v=aV1U_mK3XOs" },
      { name: "Push-Up", url: "https://www.youtube.com/watch?v=0Wa9CfRXUkA" }
    ]
  },
  {
    "Muscle": "Front-Delts",
    'MV': "0",
    'MEV': "0",
    'MAV': "6-8",
    'MRV': "12",
    "Freq": "1-2 x Week",
    "url": "https://rpstrength.com/blogs/articles/front-delt-hypertrophy-training-tips",
    "exercises": [
      { name: "Overhead Barbell Press", url: "https://www.youtube.com/watch?v=_ikCPws1mbE" },
      { name: "Dumbbell Shoulder Press", url: "https://www.youtube.com/watch?v=yIoAcMD3jcE" },
      { name: "Arnold Press", url: "https://www.youtube.com/watch?v=hRJ6tR5-if0" },
      { name: "Machine Shoulder Press", url: "https://www.youtube.com/watch?v=87pZAbYjXc4" },
      { name: "Front Dumbbell Raise", url: "https://www.youtube.com/watch?v=WvLMauqrnK8" },
      { name: "Smith Machine Press", url: "https://www.youtube.com/watch?v=IuzRCN6eG6Y" },
      { name: "Push Press", url: "https://www.youtube.com/watch?v=HzIiNhHhhtA" },
      { name: "Cable Front Raise", url: "https://www.youtube.com/watch?v=OLqZDUUD2b0" },
      { name: "Landmine Press", url: "https://www.youtube.com/watch?v=G2qpTG1Eh40" },
      { name: "Plate Front Raise", url: "https://www.youtube.com/watch?v=Raemd3qWgJc" }
    ]
  },
  {
    "Muscle": "Side-Delts",
    'MV': "0",
    'MEV': "8",
    'MAV': "16-22",
    'MRV': "26",
    "Freq": "3-6 x Week",
    "url": "https://rpstrength.com/blogs/articles/side-delt-hypertrophy-training-tips",
    "exercises": [
      { name: "Dumbbell Lateral Raise", url: "https://www.youtube.com/watch?v=um3VVzqunPU" },
      { name: "Cable Lateral Raise", url: "https://www.youtube.com/watch?v=2OMbdPF7mz4" },
      { name: "Machine Lateral Raise", url: "https://www.youtube.com/watch?v=qr3ziolhjvQ" },
      { name: "Behind the Back Cable Raise", url: "https://www.youtube.com/watch?v=Ub6QruNKfbY" },
      { name: "Upright Row", url: "https://www.youtube.com/watch?v=OuG1smZTsQQ" },
      { name: "Leaning Lateral Raise", url: "https://www.youtube.com/watch?v=lq7eLC30b9w" },
      { name: "Seated Lateral Raise", url: "https://www.youtube.com/watch?v=0o07iGKUarI" },
      { name: "One Arm Cable Lateral Raise", url: "https://www.youtube.com/watch?v=QIpa-9dtkgA" },
      { name: "Band Lateral Raise", url: "https://www.youtube.com/watch?v=D1f7d1OcobY" },
      { name: "Dumbbell W Raise", url: "https://www.youtube.com/watch?v=SKf8wHlIFX0" }
    ]
  },
  {
    "Muscle": "Rear-Delts",
    'MV': "0",
    'MEV': "8",
    'MAV': "16-22",
    'MRV': "26",
    "Freq": "2-6 x Week",
    "url": "https://rpstrength.com/blogs/articles/rear-delt-hypertrophy-training-tips",
    "exercises": [
      { name: "Dumbbell Rear Delt Swing", url: "https://www.youtube.com/watch?v=34gVHrkaiz0" },
      { name: "Cable Face Pull", url: "https://www.youtube.com/watch?v=f0g5NkYiWUY" },
      { name: "Machine Reverse Fly", url: "https://www.youtube.com/watch?v=-MODnZdnmAQ" },
      { name: "Bent Over Dumbbell Rear Delt Raise", url: "https://www.youtube.com/watch?v=qz1OLup4W_M" },
      { name: "Cable Rear Delt Fly", url: "https://www.youtube.com/watch?v=nzTY7j9ocR8" },
      { name: "Barbell Rear Delt Row", url: "https://www.youtube.com/watch?v=90cE3rCLtmo" },
      { name: "Band Pull Apart", url: "https://www.youtube.com/watch?v=z3PRz2aVA10" },
      { name: "Chest Supported Rear Delt Raise", url: "https://www.youtube.com/watch?v=8CGMuud1ANw" },
      { name: "Cable Rope Face Pull", url: "https://www.youtube.com/watch?v=5YK4bgzXDp0" },
      { name: "Incline Bench Reverse Fly", url: "https://www.youtube.com/watch?v=hPWYuhJMUhU" }
    ]
  },
  {
    "Muscle": "Biceps",
    'MV': "5",
    'MEV': "8",
    'MAV': "14-20",
    'MRV': "26",
    "Freq": "2-6 x Week",
    "url": "https://rpstrength.com/blogs/articles/bicep-hypertrophy-training-tips",
    "exercises": [
      { name: "Barbell Curl", url: "https://www.youtube.com/watch?v=iixND1P2lik" },
      { name: "EZ Bar Curl", url: "https://www.youtube.com/watch?v=pUS6HBQjRmc" },
      { name: "Dumbbell Curl", url: "https://www.youtube.com/watch?v=JnLFSFurrqQ" },
      { name: "Incline Dumbbell Curl", url: "https://www.youtube.com/watch?v=yuozln3CC94" },
      { name: "Cable Curl", url: "https://www.youtube.com/watch?v=opFVuRi_3b8" },
      { name: "Dumbbell Twist Curl", url: "https://www.youtube.com/watch?v=fuK3nFvwgXk" },
      { name: "Hammer Curl", url: "https://www.youtube.com/watch?v=ke2shAeQ0O8" },
      { name: "Spider Curl", url: "https://www.youtube.com/watch?v=tRXw8HQ7-oA" },
      { name: "Preacher Curl", url: "https://www.youtube.com/watch?v=cdmnvo3augg" },
      { name: "Concentration Curl", url: "https://www.youtube.com/watch?v=EK747VC37yE" }
    ]
  },
  {
    "Muscle": "Triceps",
    'MV': "4",
    'MEV': "6",
    'MAV': "10-14",
    'MRV': "18",
    "Freq": "2-4 x Week",
    "url": "https://rpstrength.com/blogs/articles/triceps-hypertrophy-training-tips",
    "exercises": [
      { name: "Skull Crusher", url: "https://www.youtube.com/watch?v=q5X9thiKofE" },
      { name: "Close Grip Bench Press", url: "https://www.youtube.com/watch?v=yZ83t4mrPrI" },
      { name: "Cable Pushdown", url: "https://www.youtube.com/watch?v=l3rHYPtMUo8" },
      { name: "Overhead Cable Extension", url: "https://www.youtube.com/watch?v=1u18yJELsh0" },
      { name: "Dumbbell Overhead Extension", url: "https://www.youtube.com/watch?v=Cp_bShvMY4c" },
      { name: "Dip", url: "https://www.youtube.com/watch?v=6Fzep104f0s" },
      { name: "Cable Rope Pushdown", url: "https://www.youtube.com/watch?v=4LA1kF7yCGo" },
      { name: "EZ Bar Skull Crusher", url: "https://www.youtube.com/watch?v=jPjhQ2hsAds" },
      { name: "Machine Tricep Extension", url: "https://www.youtube.com/watch?v=IdZ7HXnatko" },
      { name: "Kickback", url: "https://www.youtube.com/watch?v=1lrjpLuXH4w" }
    ]
  },
  {
    "Muscle": "Calves",
    'MV': "6",
    'MEV': "8",
    'MAV': "12-16",
    'MRV': "20",
    "Freq": "2-4 x Week",
    "url": "https://rpstrength.com/blogs/articles/calves-hypertrophy-training-tips",
    "exercises": [
      { name: "Standing Calf Raise", url: "https://www.youtube.com/watch?v=N3awlEyTY98" },
      { name: "Seated Calf Raise", url: "https://www.youtube.com/watch?v=__qfDhdByMY" },
      { name: "Leg Press Calf Raise", url: "https://www.youtube.com/watch?v=_gEx2ijsmNM" },
      { name: "Donkey Calf Raise", url: "https://www.youtube.com/watch?v=hh5516HCu4k" },
      { name: "Single Leg Calf Raise", url: "https://www.youtube.com/watch?v=KxEYX_cuesM" }
    ]
  },
  {
    "Muscle": "Abs",
    'MV': "0",
    'MEV': "0",
    'MAV': "16-20",
    'MRV': "25",
    "Freq": "3-5 x Week",
    "url": "https://rpstrength.com/blogs/articles/ab-hypertrophy-training-tips",
    "exercises": [
      { name: "Cable Crunch", url: "https://www.youtube.com/watch?v=RD_A-Z15ER4" },
      { name: "Weighted Crunch", url: "https://www.youtube.com/watch?v=7FwGZ8qY5OU" },
      { name: "Hanging Leg Raise", url: "https://www.youtube.com/watch?v=-OUSBPnHvsQ" },
      { name: "Ab Wheel Rollout", url: "https://www.youtube.com/watch?v=T_X5rb3G5lk" },
      { name: "Decline Sit-Up", url: "https://www.youtube.com/watch?v=pXg8qppif7I" },
      { name: "Machine Crunch", url: "https://www.youtube.com/watch?v=6GMKPQVERzw" },
      { name: "Weighted Plank", url: "https://www.youtube.com/watch?v=DAnTf16NcT0" },
      { name: "Dragon Flag", url: "https://www.youtube.com/watch?v=BIOM5eSsJ_8" }
    ]
  },
  {
    "Muscle": "Traps",
    'MV': "0",
    'MEV': "0",
    'MAV': "12-20",
    'MRV': "26",
    "Freq": "2-6 x Week",
    "url": "https://rpstrength.com/blogs/articles/trap-hypertrophy-training-tips",
    "exercises": [
      { name: "Barbell Shrug", url: "https://www.youtube.com/watch?v=M_MjF5Nm_h4" },
      { name: "Dumbbell Shrug", url: "https://www.youtube.com/watch?v=d9daNDIXtK8" },
      { name: "Cable Shrug", url: "https://www.youtube.com/watch?v=_t3lrPI6Ns4" },
      { name: "Smith Machine Shrug", url: "https://www.youtube.com/watch?v=5z7ZtboxbBY" },
      { name: "Behind the Back Barbell Shrug", url: "https://www.youtube.com/watch?v=GH_l85Ky3vA" },
      { name: "Overhead Barbell Shrug", url: "https://www.youtube.com/watch?v=BeIcUCKxcE" },
      { name: "Dumbbell Lean Shrug", url: "https://www.youtube.com/watch?v=2zaT3WAgZi0" },
      { name: "Kelso Shrug", url: "https://www.youtube.com/watch?v=zgToz5FiI-E" },
      { name: "Wide Grip Upright Row", url: "https://www.youtube.com/watch?v=YykmcX2b-LY" },
      { name: "Face Pull to External Rotation", url: "https://www.youtube.com/watch?v=nOn_Bz0zrwQ" }
    ]
  },
  {
    "Muscle": "Forearms",
    'MV': "0",
    'MEV': "2-8",
    'MAV': "9-19",
    'MRV': "20+",
    "Freq": "2-6 x Week",
    "url": "https://rpstrength.com/blogs/articles/forearm-hypertrophy-training-tips",
    "exercises": [
      { name: "Barbell Wrist Curl", url: "https://www.youtube.com/watch?v=lfQR7oVS8eo" },
      { name: "Reverse Barbell Curl", url: "https://www.youtube.com/watch?v=iQ4JjOK73PE" },
      { name: "Dumbbell Wrist Curl", url: "https://www.youtube.com/watch?v=2wPpcJBe03o" },
      { name: "Barbell Hold / Grip Work", url: "https://www.youtube.com/watch?v=WVAaKJvToe0" }
    ]
  }
];

/**
 * Main display for the web application. Contains a grid with a list
 * of all the muscle group landmark objects. When an object is clicked
 * on, it opens a display with in-depth recommendations for the landmarks.
 */
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {

  /**
   * Columns displayed by the hypertrophy training landmarks.
   */
  displayedColumns: string[] = ["Muscle", 'MV', 'MEV', 'MAV', 'MRV', "Freq"];

  /**
   * Rows displayed by hypertrophy training landmarks.
   */
  dataSource: VolumeLandmark[] = VOLUME_LANDMARKS;

  /**
  * Used as a constant meaning no muscle group selected.
  */
  NO_MUSCLE_GROUP: null = null;

  /**
   * Contains the selected muscle group. Null if no muscle group is selected.
   */
  selectedMuscleGroup: VolumeLandmark | null = this.NO_MUSCLE_GROUP;

  /**
   * Reference to the query param subscription.
   */
  queryParamSubscriptionRef: Subscription = null;

  /**
   * Chart options used to configure the Chart.js canvas element.
   */
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        },
        scaleLabel: {
          display: true,
          labelString: "Sets per week"
        }
      }]
    }
  }

  /**
   * Data passed to the Chart.js canvas object.
   */
  chartData: any[] = [];

  /**
   * Contains the x-axis labels for the Chart.js canvas element.
   */
  chartLabels: string[] = [];

  /**
   * @ignore
   */
  constructor(
    public dialog: MatDialog,
    public router: Router) { }

  /**
  * Creates subscription.
  */
  ngOnInit() {
    this.queryParamSubscriptionRef = this.routeChangeSubscription();
  }

  /**
  * Destroys subscriptions if they exist.
  */
  ngOnDestroy() {
    if (this.queryParamSubscriptionRef) {
      this.queryParamSubscriptionRef.unsubscribe();
    }
  }

  /**
   * Opens a dialog that allows users to share the current URL.
   */
  openShareDialog(): void {
    this.dialog.open(ShareDialogComponent, {
      width: '95%',
      maxWidth: '575px',
      minWidth: '290px',
    });
  }

  /**
   * Appends the name of a muscle group to the current URL to
   * trigger a route change event.
   */
  navigateTo(muscleGroup: VolumeLandmark) {
    const origin: string = (window.location.origin);
    const isLocalHost: boolean = origin.includes("localhost");
    let musclePath: string = "";
    if (!isLocalHost) {
      musclePath += ("/RP-Hypertrophy-Hub-Visualizer");
    }
    musclePath += ("/#/");
    if (muscleGroup) {
      musclePath += muscleGroup.Muscle
    }
    const fullRoutePath: string = (origin + musclePath);
    window.location.href = fullRoutePath;
    window.scrollTo(0, 0);
  }

  /**
   * Sets the activated muscle group to the one that was
   * just clicked on in the table.
   */
  setSelectedMuscleGroup(muscleGroup: VolumeLandmark): void {
    this.setChartFromMuscleGroup(muscleGroup);
    this.dataSource = [muscleGroup];
    this.selectedMuscleGroup = muscleGroup;
  }

  /**
   * Returns true if there is no muscle group selected.
   */
  noMuscleGroupSelected(): boolean {
    return (this.selectedMuscleGroup == this.NO_MUSCLE_GROUP);
  }

  /**
   * Returns the user to the original dashboard.
   */
  goBackToDashBoard(): void {
    this.dataSource = VOLUME_LANDMARKS;
    this.selectedMuscleGroup = this.NO_MUSCLE_GROUP;
    this.navigateTo(this.NO_MUSCLE_GROUP);
  }

  /**
   * Listens to the activated route for any changes.
   */
  routeChangeSubscription(): Subscription {
    return this.router.events.subscribe((routerEvent: any) => {
      try {
        const isValidEvent: boolean = (routerEvent != null && routerEvent instanceof NavigationEnd);
        if (isValidEvent) {
          const url: string = routerEvent.url;
          const muscleGroupObject: VolumeLandmark = VOLUME_LANDMARKS.find((muscleGroup: VolumeLandmark) => {
            const requestedMuscleExists: boolean = (url.toLowerCase().includes(muscleGroup.Muscle.toLowerCase()))
            return requestedMuscleExists;
          });
          if (muscleGroupObject) {
            this.setSelectedMuscleGroup(muscleGroupObject)
          } else {
            this.goBackToDashBoard();
          }
        }
      }
      catch (error) {
        this.goBackToDashBoard();
      }
    });
  }

  /**
   * Converts the volume recommendations for a muscle group into
   * data that can be displayed on the volume bar chart.
   */
  setChartFromMuscleGroup(muscleGroup: VolumeLandmark): void {
    const defaultChartLabels: string[] = ["MV", "MEV", "MAV", "MRV"];
    let actualChartLabels: string[] = [];
    const dataTitle: string = (muscleGroup.Muscle + " Volume");
    const volumeData: number[] = [];
    const muscleGroupChartData: any = {
      label: dataTitle,
      data: volumeData,
      backgroundColor: "#ee2d37",
      hoverBackgroundColor: "#c41e27",
    }
    defaultChartLabels.forEach((label: string) => {
      actualChartLabels.push(label);
      const volumeRecommendation: string = muscleGroup[label];
      const isRange: boolean = volumeRecommendation.includes("-");
      if (isRange) {
        const splitRecommendation: string[] = volumeRecommendation.split("-");
        const minVolumeRange: number = parseInt(splitRecommendation[0]);
        const maxVolumeRange: number = parseInt(splitRecommendation[1]);
        volumeData.push(minVolumeRange);
        volumeData.push(maxVolumeRange);
        const deepCopyOfLabel: string = (label + " ").trim();
        const labelIdx: number = actualChartLabels.indexOf(label);
        actualChartLabels[labelIdx] = "Min " + deepCopyOfLabel;
        actualChartLabels.push("Max " + deepCopyOfLabel);
      }
      else {
        volumeData.push(parseInt(volumeRecommendation));
      }
    });
    const volumeDataAsLine = {
      type: "line",
      fill: false,
      label: "Volume Curve",
      order: 1,
      data: volumeData,
      borderColor: "#6c757d",
      pointBackgroundColor: "#6c757d",
    }
    this.chartData = [muscleGroupChartData, volumeDataAsLine];
    this.chartLabels = actualChartLabels;
  }

}
