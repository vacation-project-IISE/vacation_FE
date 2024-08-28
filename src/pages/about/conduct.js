import Header from "../../component/header/header";
import NavBtn from "../../component/buttons/navBtn";
import "./about.css";
function Conduct() {
  const MoveToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  return (
    <div className="AboutPage">
      <Header />
      <div className="AboutTop">
        <h2>모나미소개</h2>
        <p>언제 어디서나 모나미는 당신 곁에 있습니다.</p>
      </div>
      <div className="BtnBox">
        <NavBtn SelectedIndex={3} />
      </div>
      <div className="Contents">
        <h3 className="Title1">
          MONAMI <span>Code of Conduct</span>
        </h3>
        <div className="ConWrap">
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">01</span> 소개
            </h4>
            <div className="ConDiscript">
              해당 직속관리자에게 보고가 이루어졌을 때, 그 관리자는 즉시 그
              사실을 경영지원 임원 혹은 법률담당에게 알려야 합니다. 어떤
              경우에는 그 직원이 모나미 대표이사에게 직접 보고하는 경우도 있을
              수 있습니다. 본 정책에 명백히 반한 사실을 보고한 직원은 그 사실을
              보고했다는 이유만으로 그 누구로부터 그 어떠한 처벌을 받을 수
              없으며 나아가 그러한 처벌을 그 직원에게 시도하는 그 행위가 해고를
              포함한 징계행위에 해당됩니다.
            </div>
            <div className="ConDiscript">
              관리자들은 본 정책의 취지를 이해하고 정규직이나 비정규직 직원들
              모두 다 이 정책의 영향을 받으며, 모든 부서원들이 본 규정과 이 법의
              정신을 지키며, 최고 수준의 성실한 경영을 보임을 확신하여야 합니다.
              관리자들은 모든 사업관계에 있어서 건전하고 성숙한 판단의 모범을
              보여야 합니다. 근무시간 중이나 외부에서의 우리의 행동이 회사의
              명성에 영향을 끼치기 때문에 모든 직원은 모나미의 이미지를
              훼손하거나 거슬릴 수 있는 그 어떠한 행동이나 모임을 자제하기를
              기대합니다.
            </div>
            <div className="ConDiscript">
              본 정책은 기업 행태의 주요한 몇 분야를 기술합니다. 그러나 사업을
              하다 보면 맞닥뜨리는 모든 상황을 다 기술할 수 없음에 본 규정이
              있음에도 불구하고 피할 수 없이 맞게 되는 소위 ‘gray area’가 있을
              수 있습니다. 모나미 직원은 누구나 본 규정을 지키기를 기대하며,
              불분명한 부분에 대한 결정을 해야 할 때에는, 자신의 가장 바람직한
              판단이나 직속관리자, 인사 전문가, 경영지원 임원 혹은
              법률담당에게서 반드시 자문을 구한 다음 행하기를 기대합니다. 본
              규정을 위반한 직원은 해고를 포함한 징계조치를 당하게 됩니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">02</span> 주주 및 투자자에 대한 자세
            </h4>
            <div className="ConDiscript">
              모나미는 주주의 권리를 보호하고 주주의 정당한 요구와 제안을
              존중합니다. 우리는 경영 정보를 성실히 공개하여 주주 및 투자자와
              상호 신뢰관계를 구축하고 주주 이익의 극대화를 위해 노력합니다.
            </div>
            <div className="ConDiscript">
              모나미는 소액주주를 포함한 모든 주주를 공정하고 평등하게
              대우합니다. 우리는 항상 전체주주의 이익을 고려하여 경영 의사를
              결정함으로써 소액주주의 이익이나 권리가 부당하게 침해되지 않도록
              합니다.
            </div>
            <div className="ConDiscript">
              MONAMI는 회계자료를 일반적으로 인정된 회계원칙에 따라
              기록·관리하여 재무상태와 경영성과를 투명하게 제공하며 정확한
              경영정보를 관련 법규에 따라 적시에 제공하여 투자자 등 정보이용자가
              합리적인 투자판단을 할 수 있도록 합니다.
            </div>
            <div className="ConDiscript">
              임직원은 업무상 취득한 내부정보를 이용하여 주식을 거래하지 않으며,
              주가에 영향을 미칠 수 있는 미공개 중요정보를 적법한 절차에 의하지
              않고 제3자에게 제공하지 않습니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">03</span> 고객에 대한 자세
            </h4>
            <div className="ConDiscript">
              모나미는 항상 고객의 입장에서 생각하고 행동하며, 고객이 만족하고
              신뢰할 수 있는 최상의 제품과 서비스를 제공하여 고객만족 실현을
              위해 노력합니다. 모나미는 고객에게 제품 및 서비스 등에 관한 정확한
              정보를 제공하고 과대선전이나 광고를 하지 않습니다.
            </div>
            <div className="ConDiscript">
              모나미는 고객의 이익과 안전, 개인정보를 보호하고 고객에게 부당한
              행위를 하지 않습니다.우리는 소비자보호에 관한 법률을 존중하고
              준수합니다.
            </div>
            <div className="ConDiscript"></div>
            <div className="ConDiscript"></div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">04</span> 경쟁사와 협력회사에 대한 자세
            </h4>
            <div className="ConDiscript">
              모나미는 자유경쟁의 원칙에 따른 공정하고 자유로운 시장경제 질서를
              존중하고, 경쟁사와 정당하게 경쟁합니다. 모나미는 공정거래질서를
              존중하고 공정거래 관련 법규를 준수합니다.
            </div>
            <div className="ConDiscript">
              모나미는 협력회사와 공정한 거래를 통해 상호신뢰와 협력관계를
              구축함으로써 공동의 발전을 추구합니다. 모나미는 우월적 지위를
              이용하여 어떠한 형태의 부당한 행위를 강요하거나 영향력을 행사하지
              않습니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">05</span> 임직원에 대한 책임
            </h4>
            <div className="ConDiscript">
              모나미 직원 각자는 모나미 성공의 주요한 기여자입니다. 우리는
              고객의 요구하는 내용과 품질을 훨씬 능가하는 품질 좋은 제품과
              해결책을 만들기 위하여 한 팀으로 일을 합니다. 이를 실천함에 있어서
              회사는 직무를 수행하는 자질 및 역량, 그리고 회사의 성공에 기여하는
              정도에 따라 채용, 승진 및 보상을 하며, 이를 실천함에는 그 어떠한
              차별을 배격합니다.
            </div>
            <div className="ConDiscript">
              남녀고용평등 법 실천자로서 회사는 모든 직원을 나이, 인종, 국적,
              종교, 성, 임신여부, 결혼여부, 장애 등에 의한 차별 없이 공평하게
              대할 것입니다. 모나미는 우수하면서도 다양한 직원분포가 우리의
              경쟁력을 유지하는 원천임을 확인합니다.
            </div>
            <div className="ConDiscript">
              모나미는 임직원의 건강과 안전한 업무환경을 위해 노력하며 임직원
              개개인의 자율과 창의를 존중하고 능력을 향상시킬 수 있는 기회를
              공정하게 부여함으로써 인재육성과 함께 자아실현을 지원합니다.
              모나미는 임직원의 독립적 인격과 기본권을 존중하며 자유로운 제안과
              건의를 할 수 있는 환경을 조성합니다.
            </div>
            <div className="ConDiscript">
              임직원은 성적 굴욕감을 유발하는 것으로 인정되는
              육체적·언어적·시각적 언어나 행동을 포함하여 건전한 동료관계를
              해치는 일체의 언어나 행동을 하지 않습니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">06</span> 법률 준수
            </h4>
            <div className="ConDiscript">
              기업경영에 적용되는 제반 민법, 형법 그리고 관련 시행령의 법 규정과
              법률 정신을 존중하며 이를 현장에 도입, 실천함으로 회사가 법률을
              성실히 준수하는 선량한 기업으로 인식되어지는 것이 모나미의
              정책입니다. 이에 모든 직원은 각 자 책무를 수행함에 있어서 허락되는
              행동들에 대한 업무 지식을 반드시 습득하여야 하며 이에 대한 질문이
              있을 시에는 상사로부터 자문을 받아야 합니다.
            </div>
            <div className="ConDiscript">
              기업 경영에 있어서 우리들의 행위를 규제하는 수 많은 법률이
              있습니다. 아래에 어떠한 법률이 어떻게 적용되는 지에 대한 법률
              목록이 있으며 직원 각자는 회사 내외의 관련 사람들에게 이 법률을
              따르기를 지도하여야 합니다. 이 목록에는 ‘지적소유권법’ ‘조세법’
              ‘근로기준법’, ‘주식 거래법’, ‘환경관련법’ ‘대정부 거래법’,
              ‘‘부패방지 관련 법’, ‘수출입관련 법’, ‘정치행위 관련 법’, ‘M&A관련
              법’ 이외 여러 법률이 있습니다.
            </div>
            <div className="ConDiscript">
              다시 한번 강조합니다. 본 정책 적용 관련 혹은 특정 상황 하에서의
              적용 법률에 관한 질문은 직속관리자나 법률고문과 반드시 사전에
              상의하여야 합니다. 어떠한 경우에는 고위 임원분과 직접 상의하여야
              할 경우도 있습니다. 법률 위반 가능성이 있거나 비윤리적 타협의
              가능성이 있는 경우에, 직원은 그 상황을 피하거나 필요 시 그 상황에
              바르게 처신해야 할 의무가 있습니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">07</span> 성의 표시
            </h4>
            <div className="ConDiscript">
              어떠한 나라에서 업무의 원활한 처리를 위하여 소위 ‘급행료’를 내는
              것이 관례이며 이것이 회사로 하여금 법 위반이라고 할 수 없는 관례가
              있습니다. 더하여 상 관례상 선의의 관계를 유지하기 위하여 개인에게
              금전이나 기념품을 선물하는 관례가 있는 나라도 있습니다. 이러한
              급행료 및 선의를 위한 금전 및 선물지급은 아래의 규정 하에서
              허락됩니다; (1) 한번에 U$ 50 (5만원) 이하 (2) 12개월 동안 한
              개인에게 U$ 500 (50만원) 내에서 지불 (3) 반드시 해당직원의 2 단계
              관리자 승인 후 집행 (4) 회사장부에 반드시 기재되어야 합니다
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">08</span> 국가경제와 사회발전 환경보호에 기여
            </h4>
            <div className="ConDiscript">
              모나미는 생산성의 향상, 고용의 창출 및 조세의 성실한 납부,
              사회공헌 등을 통하여 국가경제와 사회발전에 기여합니다. 모나미는
              자연을 보호하고 깨끗한 환경의 보전을 위해 노력합니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">09</span> 임직원의 기본 윤리 준수
            </h4>
            <div className="ConDiscript">
              임직원은 회사의 경영이념을 공유하고 회사가 추구하는 목표와 가치를
              공감하여 회사업무 방침에 따라 각자에게 부여된 사명을 성실히
              수행합니다. 임직원은 회사 내의 상하 및 동료간의 원활한 의사소통,
              상호신뢰를 바탕으로 하는 조직 문화를 창출해 나가며 주어진 직무를
              최선을 다해 정당한 방법으로 수행하고 업무와 관련된 제반 관련
              법규와 회사의 규정을 준수합니다.
            </div>
            <div className="ConDiscript"></div>
            <div className="ConDiscript"></div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">10</span> 이익충돌
            </h4>
            <div className="ConDiscript">
              모나미는 직원의 회사에 대한 충성심에 금이 가기를 원치 않습니다. 즉
              직원은 회사의 이익이나 본인의 업적성과와 충돌되는 그 어떠한 유혹,
              영향이나 관계로부터 자유로울 권리가 있습니다.
            </div>
            <div className="ConDiscript">
              따라서 직원은 탁월한 업적 창조를 위한 최선의 판단 및 회사의 경영에
              영향을 주는 행위들 에 영향을 미치거나 미칠 수 있다고 판단되는
              투기, 사례금 및 회합 등은 피하여야 합니다. 당사와 거래를 하고
              싶어하는 개인이나 조직에서 행하는 선물, 대여금 혹은 여타 다른 호의
              등에 대하여는 신중한 접근이 요구됩니다. 공급 처나 계약 처의
              사례금을 포함한 특수한 호의에 대한 의미에 대하여 특별한 의문을
              갖고 있는 직원은 그의 직속관리자에게 자문을 구하여야 합니다.
            </div>
            <div className="ConDiscript">
              다음은 받아들일 수 없는 비윤리적 사업 관행들입니다. 이들은 윤리적
              충돌을 야기하기 때문입니다. 개인의 이익을 위하여 모나미의 직책을
              유용하거나, 그 직책 수행 중에 지득한 회사 비밀 정보를 개인의
              이익을 위하여 이용하는 것, 모나미와 거래를 하는 사람으로부터
              상당한 수준의 물품이나 접대를 받는 것 이 경우, 그 대가로 그에
              상응하는 거래 조건이나 이익을 주기로 하는 것 등입니다;
            </div>
            <div className="ConDiscript">
              회사의 경영에 영향을 미칠 수 있는; 회사가 사전 허락치 않은 타
              화사로의 취업 및 자문, 행정부나 조직의 결정에 영향을 혹은 호혜적인
              대우 및 특별 이익을 조건으로 공무원, 공급자 및 고객에게 상당한
              수준의 사업상 호의를 베푸는 것 등입니다. 이익상충 이슈는 반드시
              직속관리자나 법률담당에게 가능성 있는 이슈를 통보하고 그들로부터
              서류 상 허락을 득한 후 처리하길 바랍니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">11</span> 회사 자산과 정보 지키기
            </h4>
            <div className="ConDiscript">
              치열한 경쟁 사회에서 회사 자산지킴은 대단히 중요합니다. 모나미
              자산은 눈에 보이는 것도 있지만 지적자산, 고객 정보, 신 기술 정보,
              조직 정보, 직원 개인 정보, 개인별 연봉 정보 등 눈에 보이지 않는
              정보도 포함합니다. 모나미 직원 각 자는 회사 자산을 보호할 책임이
              있습니다.
            </div>
            <div className="ConDiscript">
              임직원은 회사의 물적 재산, 지적재산권, 영업비밀 등을 보호하여야
              하며, 사적인 목적을 위해 사용하지 않습니다. 임직원은 직위를 이용한
              사적 이익 추구, 회사에서 얻은 비공개 정보를 이용한 불공정 거래
              행위를 하지 않습니다. 임직원은 회사의 이익에 영향을 미칠 수 있는
              중요한 정보를 외부에 유출하지 않습니다.
            </div>
            <div className="ConDiscript">
              따라서 모나미의 자산 정보는 사전에 허락되지 않은 한, 입으로나
              서류로나 전자적으로나 공개되어서는 안 됩니다. 우리 모두는 회사
              자산의 지킴이가 되어야 합니다. 외부의 누구를 만나서 이야기할 때에
              회사의 기술, 재무, 제품개발 그리고 여타 회사 비밀에 대한 공개를
              차단하기 위해서 그들과 이야기를 할 때에 특히 조심하여야 합니다.
              우리 모두는 함부로 발설치 말아야 하며 더하여 전자상에서의 정보의
              유출에 각별히 신경을 써야 합니다. 이에 자산 정보를 갖는 모든
              서류는 해당 비밀 등급이 찍혀있어야 하며 그 등급에 맞게 폐기관리가
              되어야 합니다. 업계 선두 기업의 직원으로서 우리는 수 많은 정보를
              전산저장 장치에 저장하고 있습니다. 만약 그와 같은 정보가
              손상되거나 도난 당했을 때에는 직원은 발견 혹은 인식하는 즉시
              직속관리자나 인사팀에 보고하여야 합니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">12</span> 기록과 보고되는 정보
            </h4>
            <div className="ConDiscript">
              직원은 회사 내에서 각 종 정보를 기록, 유지 및 제출합니다. 예를
              들면, 제한을 둘 수 없을 정도로, 근무 및 시간외 근로시간, 제품 시험
              결과, 고객 콜 및 대응 정보, 제품 주문 및 선적 기록, 재무관련 및
              비용 보고 등 헤아릴 수 없이 많습니다. 회사 내외를 막론하고
              불성실하거나 잘못된 보고는 엄격히 금하며 이는 회사나 개인에게 민사
              나아가 형사 책임까지 지게 될 수 있기 때문입니다. 일 예로 잘못된
              비용 보고서 및 근무기록 보고서는 ‘도적 질’ 로 취급될 수 있습니다.
              행정기관에 잘못된 보고서 제출은 어떤 경우, 벌금형이나 징역형에
              처해질 수도 있습니다. 따라서 정보는 정확하게 성실히 보고되어져야
              합니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">13</span> 정치관여금지
            </h4>
            <div className="ConDiscript">
              임직원은 사내에서 근무시간 중에는 정치활동을 하지 않으며 회사의
              조직, 인력 및 재산을 정치적 목적으로 이용하지 않는다. 임직원
              개개인의 참정권과 정치적 견해는 존중되나 각자의 정치적 견해나
              정치관여가 회사의 입장으로 오해받지 않도록 해야 합니다.{" "}
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">14</span> 마약 금지
            </h4>
            <div className="ConDiscript">
              모든 모나미 사업장은 마약 금지 구역입니다. 모든 직원과 계약
              근로자는 근무 시간 중에 혹은 회사 사업장 그 어느 곳에서든지
              불법마약을 소지, 사용 및 배포를 절대 금합니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">15</span> 윤리강령 도입 및 실시
            </h4>
            <div className="ConDiscript">
              모나미에서 윤리경영 실천은 모든 직원의 책무입니다. 모든 관리자는
              자기 휘하의 직원에게 본 정책에 대하여 communication하여야 할
              책임이 있으며, 본 정책은 늘 전자상에 공개되어 있어야 합니다. 본
              정책의 개정이 있을 때에는 주기적으로 online상 그리고 offline상에
              게시하여야 합니다. 모든 모나미 직원들은, 한 사람도 예외 없이,
              주기적으로 자기 소속 팀 내에서의 업무 행동과 관련된 본 정책을
              이해하고 따른다는 것을 확인하는 차원에서 서명하여야 합니다.
            </div>
            <div className="ConDiscript">
              본 윤리강령을 위반한 행위를 인지하고 있거나 그러한 행위에 대한
              의심을 갖고 있는 직원은 그의 직속관리자나 경영지원 임원이나
              법률고문에게 즉시 보고하여야 합니다. 모든 직원들은 회사가 법률
              준수와 윤리경영에 왜 그렇게 심혈을 기울이는 지를 반드시 인지하여야
              합니다. 법률과 본 정책에 반하는 것을 알면서도 보고를 하지 않은
              행위는 해고를 포함한 징계행위에 해당됩니다.
            </div>
            <div className="ConDiscript">
              해당 직속관리자에게 보고가 이루어졌을 때, 그 관리자는 즉시 그
              사실을 경영지원 임원 혹은 법률담당에게 알려야 합니다. 어떤
              경우에는 그 직원이 모나미 대표이사에게 직접 보고하는 경우도 있을
              수 있습니다. 본 정책에 명백히 반한 사실을 보고한 직원은 그 사실을
              보고했다는 이유만으로 그 누구로부터 그 어떠한 처벌을 받을 수
              없으며 나아가 그러한 처벌을 그 직원에게 시도하는 그 행위가 해고를
              포함한 징계행위에 해당됩니다.
            </div>
          </div>
          <div className="ConductBox">
            <h4 className="NumTitle" style={{ margin: "70px 0 15px 0" }}>
              <span className="Num">16</span> 본 강령의 해석
            </h4>
            <div className="ConDiscript">
              본 강령에 기술되어 있는 직원에 대한 기대는 근본적으로 중요한
              것입니다. 회사는 직원들이 관련 법률이나 정책들의 제 부문들을
              이해하고 이를 이행함에 필요한 제반 요소들을 다 마련할 것을
              확인합니다. 본 윤리강령의 제반 규정들은 회사의 정책, 절차 및
              규정들에 정확히 반영되어야 하며, 관련 법률, 규율 및 규정의 내용과
              일치하여야 합니다. 특정 상황에 본 강령의 적용 및 해석에 조금이라도
              의문이 있는 직원은 그의 팀장이나 경영지원 임원 혹은 법률담당에게서
              조언을 받아야 합니다.
            </div>
          </div>
        </div>
        <div className="BtnTop" onClick={MoveToTop}>
                  <img src="/img/BtnTop.gif" alt="페이지 상단으로"></img>
              </div>
      </div>
    </div>
  );
}

export default Conduct;
