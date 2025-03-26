var params = {
  ctmid: "8454839",
  pagesize: "",
  // poscode:"a"
};
function filterAndSortJobsByPrefix(prefix) {
  const filteredJobs = jobarr.filter((job) =>
    job.poscode.startsWith(`${prefix}-`)
  );
  filteredJobs.sort((a, b) => {
    const numA = parseInt(a.poscode.split("-")[1]);
    const numB = parseInt(b.poscode.split("-")[1]);
    return numA - numB;
  });

  return filteredJobs;
}
function joblist(poscode) {
  coapi.getJobList(params, function (data) {
    //取到数据之后的操作
    console.log(data);
    var html = "";
    var job = data.resultbody.joblist;
    if (job == undefined || job == []) {
      html =
        ' <div style="text-align:center;line-height: 100px;">暂无数据</div>';
    } else {
      console.log(poscode, "poscode2");
      const job = filterAndSortJobsByPrefix(poscode);
      console.log(job, "过滤数组");
      for (k in job) {
        html += `
                <div class="jobs">
                <div class="jobtit" jobid="${job[k].jobid}">
                  <span>${job[k].jobname}</span>
                  <span>查看详情<img src="./images/i.png" alt=""></span>
                </div>
                <div class="jobinfo">
                  <div class="jobtxt">
                  </div>
                  <div class="jobbtn"> <a href=""><img src="./images/btn.png" alt=""></a></div>
                </div>
             </div>
                `;
      }
    }

    $(".joblist").html(html);
  });
}

$(".job li")
  .click(function () {
    $(this).addClass("on").siblings().removeClass("on");
    var poscode = $(this).attr("poscode");
    // params.poscode = poscode
    joblist(poscode);
    // console.log(poscode);
  })
  .eq(0)
  .click();

$(document).on("click", ".jobtit", function () {
  //  $(this).next().slideToggle();

  let jobid = $(this).attr("jobid");
  var that = $(this);
  coapi.getJobDetail(jobid, function (data) {
    data.resultbody.jobinfo = data.resultbody.jobinfo.replace(
      /(专业要求:|资格证书或其他要求:|招聘人数:|岗位职责:|专业要求：|资格证书或其他要求：|招聘人数：|岗位职责：)/gm,
      "<b>$1</b>"
    );
    var jobinfo = `
        <div class="jobinfobk">
         <p><b>学历要求：</b></p>
         ${jobData.edu}
         <p><b>招聘人数：</b></p>
         ${jobData.num}人
        <div class="jobtxt">${jobData.res}</div>
        <div class="jobbtn"><a href="http://xyz.51job.com/external/apply.aspx?jobid=${jobData.jobid}&ctmid=8454839"><img src="./images/btn.png" alt=""></a></div>
        </div>
        `;
    that.next().html(jobinfo);
    that.next().slideToggle();
  });
});
